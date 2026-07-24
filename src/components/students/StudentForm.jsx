import React, { useEffect } from 'react';
import { useStudentContext } from '../../context/StudentContext';
import { useStudentForm } from '../../hooks/useStudentForm';
import { toast } from 'react-toastify';
import './StudentForm.css';

const StudentForm = ({ initialValues, onSuccess, onCancel }) => {
  const { createStudent } = useStudentContext();
  const { register, handleSubmit, errors, isSubmitting, reset } = useStudentForm(initialValues);

  const onSubmit = async (data) => {
    try {
      // Convert age to number if present
      const studentData = {
        ...data,
        age: data.age ? parseInt(data.age, 10) : null,
      };

      await createStudent(studentData);
      toast.success('Student created successfully! 🎉');
      reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(error.message || 'Failed to create student');
    }
  };

  return (
    <div className="student-form-container">
      <div className="form-header">
        <h2 className="form-title">Add New Student</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="student-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Full Name <span className="required">*</span>
          </label>
          <input
            id="name"
            type="text"
            className={`form-input ${errors.name ? 'error' : ''}`}
            placeholder="John Doe"
            {...register('name')}
          />
          {errors.name && (
            <span className="form-error">{errors.name.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address <span className="required">*</span>
          </label>
          <input
            id="email"
            type="email"
            className={`form-input ${errors.email ? 'error' : ''}`}
            placeholder="john.doe@email.com"
            {...register('email')}
          />
          {errors.email && (
            <span className="form-error">{errors.email.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            id="age"
            type="number"
            className={`form-input ${errors.age ? 'error' : ''}`}
            placeholder="Enter age (16-100)"
            {...register('age')}
            min="16"
            max="100"
          />
          {errors.age && (
            <span className="form-error">{errors.age.message}</span>
          )}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-success"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-small"></span>
                Creating...
              </>
            ) : (
              'Create Student'
            )}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              reset();
              if (onCancel) onCancel();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;