import { action, makeAutoObservable, observable, toJS } from 'mobx';
import { ILocalStore } from 'stores/ILocalStore/ILocalStore';
import rootStore from 'stores/RootStore';
import { decodeJWT, generateJWT } from 'utils/token';
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
interface Profile {
  email: string;
  password: string;
  fio: string | null;
   image: string | null;
  
}

class AuthStore {
  users: { email: string; password: string; fio: string | null; image: string | null; }[] = [];
  user: Profile | null = null;
  token: string | null = null;
  isAuthenticated: boolean = false;
  signUpErrors: CheckData = { email: '', password: '', confirmPassword: '' };
  loginErrors: Data = { email: '', password: ''};
  Data: Data = { email: '', password: ''};

  constructor() {
    makeAutoObservable(this, {
      isAuthenticated: observable,
      user: observable,
      login: action,
      logout: action,
      validateSignUp: action,
      signUp: action,
      setSignUpErrors: action,
    });

    this.getUsers();
    this.setUser();

  }

  setUser() {
    const authToken = rootStore.QueryStore.getQueryParam('auth');
    this.token = authToken ? String(authToken) : null;
    const decoded = decodeJWT(String(this.token));
    const email = decoded.payload.email;
    this.user= this.getUser(email)
    
  }

  getUsers() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers); 
    } else {
      this.users = []; 
    }
  }

  getUser(email: string): Profile | null {
    const user = this.users.find(user => user.email === email);
    return user || null;  
  }


  updateUserProfile(email: string, fio: string, image: string) {
    if (this.user) {
      if (this.user.fio !== fio) {
        this.user.fio = fio;
      }
      if (this.user.image !== image) {
        this.user.image = image; 
      }

      const userIndex = this.users.findIndex((user) => user.email === email);
      if (userIndex !== -1) {
        this.users[userIndex] = this.user;
      } else {
        // Если пользователя нет в массиве, добавляем его
        this.users.push(this.user);
      }
      this.saveUsersToLocalStorage();
    }
}
  
  

   // Сохраняем пользователей в localStorage
   saveUsersToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
      
  }


  logout() {
    this.token = null;
    this.isAuthenticated = false;
    rootStore.QueryStore.deleteQueryParam('auth');
  }




   // Загружаем пользователей из localStorage
   loadUsersFromLocalStorage() {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
    }
    
  }

 

  signUp(signUpData: { email: string; password: string; confirmPassword: string }) {
    // Проверяем, существует ли пользователь с таким email
    const existingUser = this.users.find(user => user.email === signUpData.email);

    if (existingUser) {
      console.error('User with this email already exists');
      return;
    }

    if (this.validateSignUp(signUpData)) {
     
      this.users.push({ email: signUpData.email, password: signUpData.password, fio:"", image: null });
      this.saveUsersToLocalStorage();


      const token = generateJWT(signUpData.email, signUpData.password);
      this.token = token;
      this.isAuthenticated = true;
      localStorage.setItem('token', token);
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
      const LoginToken = generateJWT(loginData.email, loginData.password);
      const LocalToken = localStorage.getItem('token');

  
      // Декодируем и сравниваем
      const decodedLocalToken = decodeJWT(LocalToken? LocalToken : "");
      const decodedLoginToken = decodeJWT(LoginToken);
  
      if (decodedLocalToken.payload.email === decodedLoginToken.payload.email &&
          decodedLocalToken.payload.password === decodedLoginToken.payload.password) {
          this.token = LoginToken;
          this.isAuthenticated = true;

          const foundUser = this.getUser(loginData.email);

          if (foundUser) {
            this.user = foundUser;  
            this.isAuthenticated = true;
            localStorage.setItem('token', LoginToken);
            rootStore.QueryStore.setQueryParam('auth', this.token);
          }
      } else {
        console.log('Не залогинились');
      }
    }
  }

  initializeParams(){
    rootStore.QueryStore.setQueryParam('auth', this.token)
  }
  





setSignUpErrors(errors: Partial<CheckData>) {
  this.signUpErrors = { ...this.signUpErrors, ...errors };
}
  

  // Метод для уничтожения экземпляра
  destroy(): void {
    throw new Error('Method not implemented.');
  }
}

export default new AuthStore();
