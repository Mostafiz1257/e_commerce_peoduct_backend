import Joi from "joi";

const userNameSchema = Joi.object({
    firstName: Joi.string()
      .trim()
      .max(20)
      .required()
      .custom((value:string, helpers:string) => {
        if (value.toUpperCase() !== value) {
          return helpers.message('First name must be uppercase');
        }
        return value;
      })
      .messages({
        'string.empty': 'First name required',
        'string.max': 'Maximum length will be 20 char',
      }),
    middleName: Joi.string().trim().allow(''),
    lastName: Joi.string()
      .trim()
      .required()
      .pattern(/^[a-zA-Z]+$/)
      .messages({
        'string.empty': 'Last name required',
        'string.pattern.base': 'Last name is not valid',
      }),
  });

  const guardianSchema = Joi.object({
    fatherName: Joi.string().trim().required().messages({
      'string.empty': 'Father name required',
    }),
    fatherOccupation: Joi.string().trim().allow(''),
    fatherContact: Joi.string().trim().required().messages({
      'string.empty': 'Father contact required',
    }),
    motherName: Joi.string().trim().allow(''),
    motherOccupation: Joi.string().trim().allow(''),
    motherContact: Joi.string().trim().allow(''),
  });

  const localGuardianSchema = Joi.object({
    name: Joi.string().trim().allow(''),
    occupation: Joi.string().trim().allow(''),
    contact: Joi.string().trim().allow(''),
  });

  // Define the main Joi schema for the Student model
  const studentValidationSchema = Joi.object({
    id: Joi.string().trim().required().messages({
      'string.empty': 'ID is required',
    }),
    name: userNameSchema,
    gender: Joi.string().valid('male', 'female').required().messages({
      'any.only': '{#value} is not valid',
      'string.empty': 'Gender is required',
    }),
    dateOfBirth: Joi.string().trim().required().messages({
      'string.empty': 'Date of birth is required',
    }),
    contactNo: Joi.string().trim().required().messages({
      'string.empty': 'Contact number is required',
    }),
    email: Joi.string().trim().email().required().messages({
      'string.empty': 'Email is required',
      'string.email': 'Invalid email format',
    }),
    bloodGroup: Joi.string()
      .valid('A+', 'B+', 'O+', 'O-', 'AB-', 'AB+')
      .optional()
      .messages({
        'any.only': 'Blood group is not valid',
      }),
    profileImg: Joi.string().trim().optional(),
    presentAddress: Joi.string().trim().optional(),
    permanentAddress: Joi.string().trim().optional(),
    guardian: guardianSchema.required().messages({
      'any.required': 'Guardian information is required',
    }),
    localGuardian: localGuardianSchema.required().messages({
      'any.required': 'Local guardian information is required',
    }),
    isActive: Joi.string()
      .valid('active', 'blocked')
      .default('active')
      .messages({
        'any.only': 'Status must be either "active" or "blocked"',
      }),
  });
export default studentValidationSchema;