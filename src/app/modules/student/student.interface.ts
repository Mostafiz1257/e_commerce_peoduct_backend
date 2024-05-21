import { Schema, model, connect, Model } from 'mongoose';

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContact: string;
  motherName: string;
  motherOccupation: string;
  motherContact: string;
};

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type LocalGuardian = {
  name: string;
  occupation: string;
  contract: string;
};
export type TStudent = {
  id: string;
  password: string;
  name: UserName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  contractNo?: string;
  bloodGroup: 'A+' | 'B+' | 'O+' | 'O-' | 'AB-' | 'AB+';
  email: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  guardian?: Guardian;
  localGuardian?: LocalGuardian;
  isActive: 'active' | 'blocked';
  isDeleted:boolean
};

//For creating static
export interface StudentModel extends Model<TStudent> {
 isUserExists(id:string):Promise<TStudent |null >
}

//for creating instance
// export type StudentMethods = {
//   isUserExits(id:string):Promise<TStudent | null >

// }

// export type StudentModel  = Model<TStudent,Record<string, unknown>, StudentMethods>;