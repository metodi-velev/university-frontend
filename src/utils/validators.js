import * as yup from 'yup';

export const studentSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .trim(),
  email: yup
    .string()
    .required('Email is required')
    .email('Email address must be well-formed')
    .max(255, 'Email must not exceed 255 characters'),
  age: yup
    .number()
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === '' || originalValue === null || originalValue === undefined 
        ? null 
        : Number(originalValue);
    })
    .min(16, 'Student must be at least 16 years old')
    .max(100, 'Student must be at most 100 years old'),
});

export const emailSearchSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
});