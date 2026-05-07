import type { Response, Request } from 'express';
import express from 'express';
import type { NewPatient, Patient, PatientNonPII } from '../types.ts';
import patientService from '../services/patientService.ts';
import { errorMiddleware, newPatientParser } from '../middleware/patients.ts';

const router = express.Router();

router.get('/', (_req, res: Response<PatientNonPII[]>) => {
  res.json(patientService.getPatiensNonPII());
});

router.post(
  '/',
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const newPatient = patientService.addPatient(req.body);
    res.json(newPatient);
  },
);

router.use(errorMiddleware);

export default router;
