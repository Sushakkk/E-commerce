// // src/hooks/useFormValidation.ts

// import { useState, useCallback } from 'react';
// import { validateEmail, validatePassword, validateConfirmPassword } from 'utils/validation';

// // Типы данных для хука
// interface LoginData {
//   email: string;
//   password: string;
// }

// interface SignUpData {
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

// interface FormErrors {
//   email: string;
//   password: string;
//   confirmPassword?: string;
// }

// export const useFormValidation = () => {
//   // Состояние для данных входа
//   const [loginData, setLoginData] = useState<LoginData>({ email: '', password: '' });
//   const [signUpData, setSignUpData] = useState<SignUpData>({ email: '', password: '', confirmPassword: '' });

//   // Состояние для ошибок
//   const [loginErrors, setLoginErrors] = useState<FormErrors>({ email: '', password: '' });
//   const [signUpErrors, setSignUpErrors] = useState<FormErrors>({ email: '', password: '', confirmPassword: '' });

//   // Обработчик изменений для полей в форме входа
//   const handleLoginChange = useCallback((field: 'email' | 'password', value: string) => {
//     setLoginData((prevData) => ({ ...prevData, [field]: value }));

//     setLoginErrors((prevErrors) => {
//       const newErrors = { ...prevErrors };
//       if (field === 'email') {
//         newErrors.email = validateEmail(value);
//       }
//       if (field === 'password') {
//         newErrors.password = validatePassword(value);
//       }
//       return newErrors;
//     });
//   }, []);

//   // Обработчик изменений для полей в форме регистрации
//   const handleSignUpChange = useCallback((field: 'email' | 'password' | 'confirmPassword', value: string) => {
//     setSignUpData((prevData) => ({ ...prevData, [field]: value }));

//     setSignUpErrors((prevErrors) => {
//       const newErrors = { ...prevErrors };

//       if (field === 'email') {
//         newErrors.email = validateEmail(value);
//       }

//       if (field === 'password') {
//         newErrors.password = validatePassword(value);
//         newErrors.confirmPassword = validateConfirmPassword(value, signUpData.confirmPassword);
//       }

//       if (field === 'confirmPassword') {
//         newErrors.confirmPassword = validateConfirmPassword(signUpData.password, value);
//       }

//       return newErrors;
//     });
//   }, [signUpData.password]);

//   return {
//     loginData,
//     signUpData,
//     loginErrors,
//     signUpErrors,
//     handleLoginChange,
//     handleSignUpChange
//   };
// };