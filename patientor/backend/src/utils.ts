import type { NewPatient } from './types.ts';
import { Gender } from './types.ts';
import { z } from 'zod';

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string().regex(/[\w_]+/g),
  gender: z.enum(Gender),
  occupation: z.string(),
});

export const toNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};
