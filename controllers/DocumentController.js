const { db } = require('../firebase');

module.exports = {
  list: async (req, res) => {
    try {
      const snap = await db.collection('documents').get();
      const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      res.json(items);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  get: async (req, res) => {
    try {
      const doc = await db.collection('documents').doc(req.params.id).get();
      if (!doc.exists) return res.status(404).json({ error: 'Not found' });
      res.json({ id: doc.id, ...doc.data() });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
}