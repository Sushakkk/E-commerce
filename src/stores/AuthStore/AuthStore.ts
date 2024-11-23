import { action, makeAutoObservable } from 'mobx';
import { ILocalStore } from 'stores/ILocalStore/ILocalStore';
import rootStore from 'stores/RootStore';
import { validateEmail } from 'utils/validation';


interface CheckData {
  email: string;
  password: string;
  confirmPassword: string;
}
interface Data {
  email: string;
  password: string;
}

class AuthStore implements ILocalStore {
  users: { email: string; password: string }[] = [];
  token: string | null = null;
  isAuthenticated: boolean = false;
  signUpErrors: CheckData = { email: '', password: '', confirmPassword: '' };
  loginErrors: Data = { email: '', password: ''};
  Data: Data = { email: '', password: ''};

  constructor() {
    makeAutoObservable(this, {
      checkAuth: action,
      login: action,
      logout: action,
      validateSignUp: action,
      signUp: action,
      setSignUpErrors: action,
    });


    this.loadUsersFromLocalStorage();
  }


  logout() {
    this.token = null;
    this.isAuthenticated = false;
    rootStore.QueryStore.deleteQueryParam('auth');
  }

  checkAuth() {
    const token = localStorage.getItem('token');
    if (token) {
      this.token = token;
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false; 
    }
    return this.isAuthenticated;
  }


   // Загружаем пользователей из localStorage
   loadUsersFromLocalStorage() {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
    }
    console.log(savedUsers);
    
  }

  // Сохраняем пользователей в localStorage
  saveUsersToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  signUp(signUpData: { email: string; password: string; confirmPassword: string }) {
    // Проверяем, существует ли пользователь с таким email
    const existingUser = this.users.find(user => user.email === signUpData.email);

    if (existingUser) {
      console.error('User with this email already exists');
      return;
    }

    if (this.validateSignUp(signUpData)) {
      // Добавляем нового пользователя в массив
      this.users.push({ email: signUpData.email, password: signUpData.password });

      // Сохраняем обновленный список пользователей в localStorage
      this.saveUsersToLocalStorage();

      // Генерация токена
      const token = this.generateJWT(signUpData.email, signUpData.password);
      this.token = token;
      this.isAuthenticated = true;
      localStorage.setItem('token', token);

      console.log('User registered successfully:', token);
    }
  }



  validateSignUp(signUpData: CheckData) {
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

    if (signUpData.password !== signUpData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    this.signUpErrors = errors;
    if (!errors.email && !errors.password && !errors.confirmPassword) {
      console.log('TRUE Sign Up Data:', signUpData);
      this.Data.email = signUpData.email;
      this.Data.password = signUpData.password;
      return true;
    }
    return false;
  }


  


  login(loginData: { email: string; password: string }) {
    const errors = { email: '', password: '' };
  
    if (!loginData.email) {
      errors.email = 'E-mail is required';
    } else if (!validateEmail(loginData.email)) {
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
  
      // Декодируем и сравниваем
      const decodedLocalToken = this.decodeJWT(LocalToken? LocalToken : "");
      const decodedLoginToken = this.decodeJWT(LoginToken);
  
      if (decodedLocalToken.payload.email === decodedLoginToken.payload.email &&
          decodedLocalToken.payload.password === decodedLoginToken.payload.password) {
          this.token = LoginToken;
          this.isAuthenticated = true;
          localStorage.setItem('token', LoginToken);
          rootStore.QueryStore.setQueryParam('auth', 'true');
        console.log('Зашли');
      } else {
        console.log('Не залогинились');
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


  // Декодирование base64url в строку
base64UrlDecode(base64Url: string): string {
  return atob(base64Url.replace(/-/g, '+').replace(/_/g, '/'));
}

// Функция для декодирования JWT
decodeJWT(token: string): { header: any, payload: any } {
  // Разделяем JWT на 3 части
  const [encodedHeader, encodedPayload] = token.split('.');

  // Декодируем Base64Url части
  const decodedHeader = this.base64UrlDecode(encodedHeader);
  const decodedPayload = this.base64UrlDecode(encodedPayload);

  // Преобразуем JSON строки в объекты
  const header = JSON.parse(decodedHeader);
  const payload = JSON.parse(decodedPayload);

  return { header, payload };
}


setSignUpErrors(errors: Partial<CheckData>) {
  this.signUpErrors = { ...this.signUpErrors, ...errors };
}
  

  // Метод для уничтожения экземпляра
  destroy(): void {
    throw new Error('Method not implemented.');
  }
}

export default AuthStore;
