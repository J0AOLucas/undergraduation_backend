const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config();

const projectId = process.env.FIREBASE_PROJECT_ID;
const databaseURL = process.env.FIREBASE_URL || process.env.FIREBASE_DATABASE_URL;
const credsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!admin.apps.length) {
  const initOptions = { projectId, databaseURL };
  if (credsPath) {
    const resolved = path.isAbsolute(credsPath) ? credsPath : path.resolve(process.cwd(), credsPath);
    initOptions.credential = admin.credential.cert(require(resolved));
  } else {
    initOptions.credential = admin.credential.applicationDefault();
  }
  admin.initializeApp(initOptions);
}

const db = admin.firestore();

module.exports = { admin, db };