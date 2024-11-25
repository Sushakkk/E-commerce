// src/utils/errors.ts

export const createLoginErrors = (email: string, password: string) => {
    return {
      email: email ? '' : 'Email обязателен',
      password: password ? '' : 'Пароль обязателен',
    };
  };
  
  export const createSignUpErrors = (email: string, password: string, confirmPassword: string) => {
    return {
      email: email ? '' : 'Email обязателен',
      password: password ? '' : 'Пароль обязателен',
      confirmPassword: confirmPassword ? '' : 'Подтверждение пароля обязательно',
    };
  };
  