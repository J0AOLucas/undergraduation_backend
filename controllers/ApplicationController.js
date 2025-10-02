const { db } = require('../firebase');

module.exports = {
  list: async (req, res) => {
    try {
      const snap = await db.collection('applications').get();
      const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      res.json(items);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  get: async (req, res) => {
    try {
      const docs = await db.collection('applications')
      .where('student_id', '==', req.params.id)
      .limit(1)
      .get();
      if (docs.empty) return res.status(404).json({ error: 'Not found' });
      const doc = docs.docs[0];
      res.json({ id: doc.application_id, ...doc.data() });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
};
