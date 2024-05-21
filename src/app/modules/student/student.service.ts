import { TStudent } from './student.interface';
import { Student } from './student.model';

//create student
const createStudentToDb = async (studentData: TStudent) => {

  //static method
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exists');
  }
  const result = await Student.create(studentData);

  //   const student = new Student(studentData);

  // if(await student.isUserExits(studentData.id)){
  //   throw new Error('User already exists')
  // }

  //   const result  = await student.save();

  return result;
};

//get all student
const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};
//get single student
const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

//delete student for, DB
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};
export const studentServices = {
  createStudentToDb,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
