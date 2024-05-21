import { Request, Response } from 'express';
import { studentServices } from './student.service';
import studentValidationSchema from './student.validation';
// import studentValidationSchema from './student.joyValidation';
const Joi = require('joi');

//Create a student data
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    console.log(studentData);
    //joi schema validation
    // const { error, value } = studentValidationSchema.validate(studentData);
    // const result = await studentServices.createStudentToDb(value);

    // console.log(studentData);
    //data validation with zod
    const zodParseData = studentValidationSchema.parse(studentData);
     console.log(zodParseData);
    const result = await studentServices.createStudentToDb(zodParseData);
    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'failed to create a data',
      error: error,
    });
  }
};

//get all data
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'Get all data  successfully',
      body: result,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message || 'failed to load data',
      error: error,
    });
  }
};

//get single student data
const getSingleStudents = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentFromDB(studentId);
    console.log(result);
    res.status(200).json({
      success: true,
      message: ' successfully get a single data',
      body: result,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message || 'failed to load data',
      error: error,
    });
  }
};

//delete student form DB
const deleteStudents = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.deleteStudentFromDB(studentId);
    console.log(result);
    res.status(200).json({
      success: true,
      message: ' successfully delete a student',
      body: result,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message || 'failed to load data',
      error: error,
    });
  }
};

export const studentController = {
  createStudent,
  getAllStudents,
  getSingleStudents,
  deleteStudents,
};
