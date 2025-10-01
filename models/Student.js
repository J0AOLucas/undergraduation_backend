const { z } = require('zod');

const StudentSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  phone_number: z.string().optional(),
  country: z.string().optional(),
  grade: z.string().optional(),
  last_active: z.any().nullable().optional(),
  status: z.enum(['higher_intent', 'essay_help', 'not_interested']),
  last_contact: z.any().nullable().optional(),
  created_at: z.any().optional(),
  updated_at: z.any().optional(),
});

function toDomain(id, data) {
  return { id, ...data };
}

module.exports = { StudentSchema, toDomain };


