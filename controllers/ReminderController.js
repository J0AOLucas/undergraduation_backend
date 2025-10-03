const { db } = require('../firebase');
const { z } = require('zod');

const ReminderSchema = z.object({
  student_id: z.string(),
  reason: z.string(),
  author_id: z.string(),
  schedule_date: z.any().optional(),
  created_at: z.any().optional(),
  updated_at: z.any().optional(),
});

module.exports = {
  list: async (req, res) => {
    try {
      const { student_id } = req.query;
      let q = db.collection('reminders');
      
      // Filter by student_id if provided
      if (student_id) {
        q = q.where('student_id', '==', student_id);
      }
      
      const snap = await q.get();
      const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      res.json(items);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  get: async (req, res) => {
    try {
      const doc = await db.collection('reminders').doc(req.params.id).get();
      if (!doc.exists) return res.status(404).json({ error: 'Not found' });
      res.json({ id: doc.id, ...doc.data() });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  create: async (req, res) => {
    try {
      const data = ReminderSchema.parse(req.body);
      const now = new Date();
      const ref = await db.collection('reminders').add({ ...data, created_at: now, updated_at: now });
      const doc = await ref.get();
      res.status(201).json({ id: doc.id, ...doc.data() });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  update: async (req, res) => {
    try {
      const data = ReminderSchema.partial().parse(req.body);
      const now = new Date();
      await db.collection('reminders').doc(req.params.id).update({ ...data, updated_at: now });
      const doc = await db.collection('reminders').doc(req.params.id).get();
      if (!doc.exists) return res.status(404).json({ error: 'Not found' });
      res.json({ id: doc.id, ...doc.data() });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  delete: async (req, res) => {
    try {
      await db.collection('reminders').doc(req.params.id).delete();
      res.status(204).send();
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
};