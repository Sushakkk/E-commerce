import React, { useCallback, useEffect, useState } from 'react';
import styles from './AuthorizePage.module.scss';
import Button from 'components/Button/Button';
import { observer, useLocalStore } from 'mobx-react-lite';
import AuthStore from 'stores/AuthStore';
import { validateEmail } from 'utils/validation';
import { useNavigate } from 'react-router-dom';

const AuthorizePage: React.FC = observer(() => {
  const localAuthStore= AuthStore;



  const [isLoginActive, setIsLoginActive] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginErrors, setLoginErrors] = useState({ email: '', password: '' });

  const [signUpData, setSignUpData] = useState({ email: '', password: '', confirmPassword: '' });
  const [signUpErrors, setSignUpErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();



  useEffect(()=>{
    console.log(localAuthStore.user)
    if(localAuthStore.isAuthenticated){
        navigate('/profile')
    }
  }, [localAuthStore.isAuthenticated])

  const handleLoginSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      localAuthStore.login(loginData);
    },
    [loginData, localAuthStore]
  );

  const handleSignUpSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      localAuthStore.signUp(signUpData);
    },
    [signUpData, localAuthStore]
  );

  const handleLoginChange = useCallback(
    (field: 'email' | 'password', value: string) => {
      setLoginData((prevData) => ({ ...prevData, [field]: value }));

      setLoginErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        if (field === 'email') {
          if (!value) {
            newErrors.email = 'E-mail is required';
          } else if (!validateEmail(value)) {
            newErrors.email = 'Invalid e-mail format';
          } else {
            newErrors.email = '';
          }
        }
        if (field === 'password') {
          newErrors.password = value ? '' : 'Password is required';
        }
        return newErrors;
      });
    },
    [validateEmail]
  );

  const handleSignUpChange = useCallback(
    (field: 'email' | 'password' | 'confirmPassword', value: string) => {
      setSignUpData((prevData) => ({ ...prevData, [field]: value }));

      setSignUpErrors((prevErrors) => {
        const newErrors = { ...prevErrors };

        if (field === 'email') {
          if (!value) {
            newErrors.email = 'E-mail is required';
          } else if (!validateEmail(value)) {
            newErrors.email = 'Invalid e-mail format';
          } else {
            newErrors.email = '';
          }
        }

        if (field === 'password') {
          if (!value) {
            newErrors.password = 'Password is required';
          } else if (value.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
          } else {
            newErrors.password = '';
          }

          if (value !== signUpData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
          } else {
            newErrors.confirmPassword = '';
          }
        }

        if (field === 'confirmPassword') {
          if (value !== signUpData.password) {
            newErrors.confirmPassword = 'Passwords do not match';
          } else {
            newErrors.confirmPassword = '';
          }
        }

        return newErrors;
      });
    },
    [validateEmail, signUpData.password]
  );





  return (
    <main className={styles.page}>
      <section className={styles.formsSection}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${isLoginActive ? styles.activeTab : ''}`}
            onClick={() => setIsLoginActive(true)}
          >
            Login
          </button>
          <button
            className={`${styles.tab} ${!isLoginActive ? styles.activeTab : ''}`}
            onClick={() => setIsLoginActive(false)}
          >
            Sign Up
          </button>
        </div>

        <div className={styles.formContainer}>
          <div
            className={`${styles.formWrapper} ${styles.login} ${
              isLoginActive ? styles.active : ''
            }`}
          >
            <form className={styles.form} onSubmit={handleLoginSubmit}>
              <h2 className={styles.formTitle}>Login</h2>
              <div className={styles.inputBlock}>
                <label htmlFor="login-email">E-mail</label>
                <input
                  id="login-email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) => handleLoginChange('email', e.target.value)}
                />
                {loginErrors.email && <span className={styles.error}>{loginErrors.email}</span>}
              </div>
              <div className={styles.inputBlock}>
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => handleLoginChange('password', e.target.value)}
                />
                {loginErrors.password && <span className={styles.error}>{loginErrors.password}</span>}
              </div>
              <Button
                type="submit"
                className={`${styles.submitButton} ${isSuccess ? styles.success : ''}`}
              >
                Login
              </Button>
            </form>
          </div>

          <div
            className={`${styles.formWrapper} ${styles.register} ${
              !isLoginActive ? styles.active : ''
            }`}
          >
            <form className={styles.form} onSubmit={handleSignUpSubmit}>
              <h2 className={styles.formTitle}>Sign Up</h2>
              <div className={styles.inputBlock}>
                <label htmlFor="signup-email">E-mail</label>
                <input
                  id="signup-email"
                  type="email"
                  value={signUpData.email}
                  onChange={(e) => handleSignUpChange('email', e.target.value)}
                />
                {signUpErrors.email && <span className={styles.error}>{signUpErrors.email}</span>}
              </div>
              <div className={styles.inputBlock}>
                <label htmlFor="signup-password">Password</label>
                <input
                  id="signup-password"
                  type="password"
                  value={signUpData.password}
                  onChange={(e) => handleSignUpChange('password', e.target.value)}
                />
                {signUpErrors.password && <span className={styles.error}>{signUpErrors.password}</span>}
              </div>
              <div className={styles.inputBlock}>
                <label htmlFor="signup-password-confirm">Confirm Password</label>
                <input
                  id="signup-password-confirm"
                  type="password"
                  value={signUpData.confirmPassword}
                  onChange={(e) => handleSignUpChange('confirmPassword', e.target.value)}
                />
                {signUpErrors.confirmPassword && (
                  <span className={styles.error}>{signUpErrors.confirmPassword}</span>
                )}
              </div>
              <Button
                type="submit"
                className={`${styles.submitButton} ${isSuccess ? styles.success : ''}`}
              >
                Sign Up
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
});

export default AuthorizePage;
