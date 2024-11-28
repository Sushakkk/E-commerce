// utils/validationUtils.ts

import { validateEmail } from './validation';

interface CheckData {
    email: string;
    password: string;
    confirmPassword: string;  
  }
  

// Валидация данных для регистрации
export function validateSignUpData(signUpData: CheckData): { errors: CheckData; isValid: boolean } {
  const errors: CheckData = { email: '', password: '', confirmPassword: '' };

  if (!signUpData.email) {
    errors.email = 'E-mail is required';
  } else if (!validateEmail(signUpData.email)) {
    errors.email = 'Invalid e-mail format';
  }

  if (!signUpData.password) {
    errors.password = 'Password is required';
  } else if (signUpData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (signUpData.confirmPassword && signUpData.password !== signUpData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  const isValid = !errors.email && !errors.password && !errors.confirmPassword;
  return { errors, isValid };
}

// Валидация данных для логина
export function validateLoginData(loginData: { email: string; password: string }): { errors: { email: string; password: string }; isValid: boolean } {
  const errors = { email: '', password: '' };

  if (!loginData.email) {
    errors.email = 'E-mail is required';
  } else if (!validateEmail(loginData.email)) {
    errors.email = 'Invalid e-mail format';
  }

  if (!loginData.password) {
    errors.password = 'Password is required';
  }

  const isValid = !errors.email && !errors.password;
  return { errors, isValid };
}
