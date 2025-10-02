const { admin } = require("../firebase");
const fetch = require("node-fetch"); // For REST API login

// Register user with email/password
exports.registerUser = async (req, res) => {
  const { email, password, displayName } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName
    });

    res.status(201).json({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login user with email/password
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  try {
    // Firebase Admin cannot check passwords directly
    // Use REST API to sign in
    const firebaseAPIKey = process.env.FIREBASE_API_KEY;
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseAPIKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error.message });
    }

    // Get additional user info from Firebase Admin
    const userRecord = await admin.auth().getUser(data.localId);
    
    res.json({
      user: {
        uid: data.localId,
        email: data.email,
        displayName: userRecord.displayName,
        emailVerified: userRecord.emailVerified,
        createdAt: userRecord.metadata.creationTime,
        lastSignIn: userRecord.metadata.lastSignInTime
      },
      token: {
        idToken: data.idToken,
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};