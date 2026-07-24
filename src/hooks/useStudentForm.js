import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { studentSchema } from '../utils/validators';

export const useStudentForm = (initialValues = {}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(studentSchema),
    defaultValues: {
      name: initialValues.name || '',
      email: initialValues.email || '',
      age: initialValues.age || '',
    },
  });

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    reset,
    setValue,
    watch,
  };
};