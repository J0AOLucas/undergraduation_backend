const { db } = require('../firebase');

module.exports = {
  list: async (req, res) => {
    try {
      const { admin_id } = req.query;
      if (admin_id) {
        const snap = await db
          .collection('admins')
          .where('admin_id', '==', admin_id)
          .limit(1)
          .get();
        if (snap.empty) return res.status(404).json({ error: 'Not found' });
        const doc = snap.docs[0];
        return res.json({ id: doc.id, ...doc.data() });
      }

      const snap = await db.collection('admins').get();
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      res.json(items);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  get: async (req, res) => {
    try {
      const { admin_id } = req.query;
      const { id } = req.params;

      if (admin_id) {
        const snap = await db.collection('admins')
          .where('admin_id', '==', admin_id)
          .limit(1)
          .get();

        if (snap.empty) return res.status(404).json({ error: 'Not found' });
        const doc = snap.docs[0];
        return res.json({ id: doc.id, ...doc.data() });
      }

      const doc = await db.collection('admins').doc(id).get();
      if (!doc.exists) return res.status(404).json({ error: 'Not found' });
      res.json({ id: doc.id, ...doc.data() });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  create: async (req, res) => {
    const data = AdminSchema.parse(req.body);
    const now = new Date();
    const ref = await db.collection("admin").add({ ...data, created_at: now, updated_at: now });
    const doc = await ref.get();
    res.status(201).json({ id: doc.id, ...doc.data() });
  }
};