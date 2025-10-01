const { db } = require('../firebase');
const { StudentSchema } = require('../models/Student');

module.exports = {
  list: async (req, res) => {
    try {
      const { status, limit } = req.query;
      let q = db.collection('students');
      if (status) q = q.where('status', '==', status);
      const snap = await q.limit(Number(limit) || 50).get();
      const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      res.json(items);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  get: async (req, res) => {
    try {
      const doc = await db.collection('students').doc(req.params.id).get();
      if (!doc.exists) return res.status(404).json({ error: 'Not found' });
      res.json({ id: doc.id, ...doc.data() });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  create: async (req, res) => {
    try {
      const data = StudentSchema.parse(req.body);
      const now = new Date();
      const ref = await db.collection('students').add({ ...data, created_at: now, updated_at: now });
      const doc = await ref.get();
      res.status(201).json({ id: doc.id, ...doc.data() });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  update: async (req, res) => {
    try {
      const data = StudentSchema.partial().parse(req.body);
      const now = new Date();
      await db.collection('students').doc(req.params.id).update({ ...data, updated_at: now });
      const doc = await db.collection('students').doc(req.params.id).get();
      if (!doc.exists) return res.status(404).json({ error: 'Not found' });
      res.json({ id: doc.id, ...doc.data() });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
};


