import { action, makeAutoObservable } from 'mobx';
import { ILocalStore } from 'stores/ILocalStore/ILocalStore';

interface SignUpErrors {
  email: string;
  password: string;
  confirmPassword: string;
}
interface Data {
  email: string;
  password: string;
}

class AuthStore implements ILocalStore {
  token: string | null = null;
  isAuthenticated: boolean = false;
  signUpErrors: SignUpErrors = { email: '', password: '', confirmPassword: '' };
  loginErrors: Data = { email: '', password: ''};
  Data: Data = { email: '', password: ''};

  constructor() {
    makeAutoObservable(this, {
      checkAuth: action,
      login: action,
      logout: action,
      validateSignUp: action,
      signUp: action,
    });
  }

  // Метод для логина, сохраняет токен в состоянии и в localStorage
  login(token: string) {
    this.token = token;
    this.isAuthenticated = true;
    localStorage.setItem('token', token);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
  }

  // Метод для инициализации состояния на основе localStorage
  checkAuth() {
    const token = localStorage.getItem('token');
    if (token) {
      this.token = token;
      this.isAuthenticated = true; // Пользователь авторизован
    } else {
      this.isAuthenticated = false; // Нет токена, пользователь не авторизован
    }
    return this.isAuthenticated;
  }

  // Логика для регистрации с валидацией
  validateSignUp(signUpData: { email: string; password: string; confirmPassword: string }) {
    const errors: SignUpErrors = { email: '', password: '', confirmPassword: '' };

    if (!signUpData.email) {
      errors.email = 'E-mail is required';
    } else if (!this.validateEmail(signUpData.email)) {
      errors.email = 'Invalid e-mail format';
    }

    if (!signUpData.password) {
      errors.password = 'Password is required';
    } else if (signUpData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // Если ошибок нет, то регистрируем пользователя и генерируем токен
    this.signUpErrors = errors;
    if (!errors.email && !errors.password && !errors.confirmPassword) {
      console.log('TRUE Sign Up Data:', signUpData);
      this.Data.email = signUpData.email;
      this.Data.password = signUpData.password;
      return true;
    }
    return false;
  }

  // Валидация email
  validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }


  validateLogin(loginData: { email: string; password: string}){
    const errors = { email: '', password: '' };
  
    if (!loginData.email) {
      errors.email = 'E-mail is required';
    } else if (!this.validateEmail(loginData.email)) {
      errors.email = 'Invalid e-mail format';
    }
  
    if (!loginData.password) {
      errors.password = 'Password is required';
    }
  
    this.loginErrors = errors;
  
    if (!errors.email && !errors.password) {
      const LoginToken = this.generateJWT(loginData.email, loginData.password);
    
      const LocalToken = localStorage.getItem('token');
      console.log(` Логин токен ${LoginToken}`);
      
      if (LocalToken === LoginToken) {
        this.login(LoginToken)
        console.log('зашли');
        
      } else {
        console.log('не залогинились');
      }
    }
  }




  // Генерация JWT
  generateJWT(email: string, password: string) {
    const header = { alg: "HS256", typ: "JWT" };
    const payload = {
      email: email,
      password: password,
      iat: Math.floor(Date.now() / 1000), // Время создания токена
    };
    const secretKey = "my_secret_key"; // В реальном приложении этот ключ должен быть на сервере

    const encodedHeader = this.base64UrlEncode(header);
    const encodedPayload = this.base64UrlEncode(payload);
    const signature = this.generateSignature(encodedHeader, encodedPayload, secretKey);

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  // Кодирование в base64url
  base64UrlEncode(obj: object) {
    return btoa(JSON.stringify(obj))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, ''); // base64url
  }

  // Генерация подписи
  generateSignature(header: string, payload: string, secretKey: string) {
    const data = `${header}.${payload}`;
    // Для упрощения используем простую HMAC подпись на клиенте
    const signature = btoa(data + secretKey).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return signature;
  }


  signUp() {
    const token = this.generateJWT(this.Data.email, this.Data.password);
    this.token = token;
    this.isAuthenticated = true;
    localStorage.setItem('token', token); 
    console.log(token);
    
  }

  // Метод для уничтожения экземпляра
  destroy(): void {
    throw new Error('Method not implemented.');
  }
}

export default AuthStore;
