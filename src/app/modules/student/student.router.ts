import express from 'express';
import { studentController } from './student.controller';

const router = express.Router();
router.post('/create-student', studentController.createStudent);
router.get('/', studentController.getAllStudents);
router.get('/:studentId', studentController.getSingleStudents);
router.delete('/:studentId', studentController.deleteStudents);
export const studentRoute = router;
