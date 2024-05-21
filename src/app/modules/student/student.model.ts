import { Schema, model, connect } from 'mongoose';
import validator from 'validator';
import {
  Guardian,
  LocalGuardian,
  TStudent,
  // StudentMethods,
  StudentModel,
  UserName,
} from './student.interface';
import { studentController } from './student.controller';
import bcrypt from 'bcrypt';
import config from '../../config';
import { boolean } from 'joi';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First name required'],
    trim: true,
    maxlength: [20, 'maximum length will be 20 char'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.toUpperCase();
        return firstNameStr === value;
      },
      message: '{VALUE} is not matching with right formate',
    },
  },
  middleName: { type: String },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true, trim: true },
  fatherOccupation: { type: String },
  fatherContact: { type: String, required: true },
  motherName: { type: String },
  motherOccupation: { type: String },
  motherContact: { type: String },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String },
  occupation: { type: String },
  contract: { type: String },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: userNameSchema,
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message: '{VALUE} is not valid',
      },
      required: true,
    },
    dateOfBirth: { type: String, required: true },
    contractNo: { type: String },
    email: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'B+', 'O+', 'O-', 'AB-', 'AB+'],
    },
    profileImg: { type: String },
    presentAddress: { type: String },
    permanentAddress: { type: String },
    guardian: {
      type: guardianSchema,
      required: true,
    },
    localGuardian: {
      type: localGuardianSchema,
    },
    isActive: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

//middleware
studentSchema.pre('save', async function () {
  // console.log(this,"This is pre middleware");
  const user = this;
  this.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
});

studentSchema.post('save', function (doc, next) {
  // console.log(this,"THis is post middleware");
  doc.password = '';
  next();
});

//query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//here aggregate middleware
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

//creating a custom instance methods

// studentSchema.methods.isUserExits = async function (id: string) {
//   const exitingUser = await Student.findOne({ id });
//   return exitingUser;
// };

//model

//change this name fom studentModel to student
export const Student = model<TStudent, StudentModel>('student', studentSchema);
