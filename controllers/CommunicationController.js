const { db } = require('../firebase');
const { z } = require('zod');

const CommunicationSchema = z.object({
  student_id: z.string(),
  channel: z.enum(['email', 'sms', 'phone', 'manual']),
  content: z.string(),
  author: z.string(),
  created_at: z.any().optional(),
  updated_at: z.any().optional(),
});

module.exports = {
  list: async (req, res) => {
    try {
      const snap = await db.collection('communications').get();
      const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      res.json(items);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  get: async (req, res) => {
    try {
      const doc = await db.collection('communications').doc(req.params.id).get();
      if (!doc.exists) return res.status(404).json({ error: 'Not found' });
      res.json({ id: doc.id, ...doc.data() });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  create: async (req, res) => {
    try {
      const data = CommunicationSchema.parse(req.body);
      const now = new Date();
      const ref = await db.collection('communications').add({ ...data, created_at: now, updated_at: now });
      const doc = await ref.get();
      res.status(201).json({ id: doc.id, ...doc.data() });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  update: async (req, res) => {
    try {
      const data = CommunicationSchema.partial().parse(req.body);
      const now = new Date();
      await db.collection('communications').doc(req.params.id).update({ ...data, updated_at: now });
      const doc = await db.collection('communications').doc(req.params.id).get();
      if (!doc.exists) return res.status(404).json({ error: 'Not found' });
      res.json({ id: doc.id, ...doc.data() });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  delete: async (req, res) => {
    try {
      await db.collection('communications').doc(req.params.id).delete();
      res.status(204).send();
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
};