import { z } from 'zod';

// Define the UserName Zod schema
const userNameSchema = z.object({
  firstName: z.string()
    .trim()
    .max(20, 'maximum length will be 20 char')
    .refine((value) => value.toUpperCase() === value, {
      message: '{VALUE} is not matching with right formate',
    }),
  middleName: z.string(),
  lastName: z.string()
});

// Define the Guardian Zod schema
const guardianSchema = z.object({
  fatherName: z.string().nonempty('Father name required').trim(),
  fatherOccupation: z.string(),
  fatherContact: z.string().nonempty('Father contact required'),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContact: z.string(),
});

// Define the LocalGuardian Zod schema
const localGuardianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contract: z.string(),
});

// Define the Student Zod schema
const studentValidationSchema = z.object({
  id: z.string(),
  password: z.string(),
  name: userNameSchema,
  gender: z.enum(['male', 'female']),
  dateOfBirth: z.string(),
  contractNo: z.string().optional(),
  email: z.string(),
  bloodGroup: z.enum(['A+', 'B+', 'O+', 'O-', 'AB-', 'AB+']),
  profileImg: z.string(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: guardianSchema.optional(),
  localGuardian: localGuardianSchema.optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted:z.boolean()
});

export default studentValidationSchema;
