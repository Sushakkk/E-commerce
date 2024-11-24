import { action, makeAutoObservable, observable, toJS } from 'mobx';
import { IBasketProduct } from 'modules/types';
import BasketStore from 'stores/BasketStore';
import rootStore from 'stores/RootStore';
import { decodeJWT, generateJWT } from 'utils/token';
import { validateSignUpData, validateLoginData } from 'utils/validationUtils';  // Новый импорт функций валидации


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
  basketItems: IBasketProduct[];  
}

class AuthStore {
  users: Profile[] = [];
  user: Profile | null = null;
  token: string | null = null;
  isAuthenticated: boolean = false;
  signUpErrors: CheckData = { email: '', password: '', confirmPassword: '' };
  loginErrors: Data = { email: '', password: '' };

  constructor() {
    makeAutoObservable(this, {
      users: observable,
      user: observable,
      token: observable,
      isAuthenticated: observable,
      signUpErrors: observable,
      loginErrors: observable,
      setUser: action,
      getUsers: action,
      getUser: action,
      signUp: action,
      login: action,
      updateUserProfile: action,
      saveUsersToLocalStorage: action,
      logout: action,
      initializeParams: action,
    });
    this.getUsers(); 
    this.setUser(); 
  }

  saveBasketToUser() {
   
    if (this.user && this.isAuthenticated) {
      const newBasket = BasketStore.basketItems;
      if (this.user.basketItems) {
        this.user.basketItems = newBasket;
      } else {
        this.user.basketItems = [...newBasket];
      }

      this.saveUsersToLocalStorage(this.user.email ? this.user.email : '');
  
    } 
  }
  

  setUser() {
    const authToken = rootStore.QueryStore.getQueryParam('auth');
    if (!authToken) {
      console.error("Auth token not found");
      return;
    }

    this.token = String(authToken);

    try {
      const decoded = decodeJWT(this.token);
      const email = decoded.payload.email;
      this.user = this.getUser(email);
      return this.user
    } catch (error) {
      console.error("Error decoding JWT:", error);
    }
  }

  getUsers() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    } else {
      this.users = [];
    }
    console.log(toJS(this.users ));
    
  }

  getUser(email: string): Profile | null {
    const user = this.users.find(user => user.email === email);
    return user || null;
  }

  signUp(signUpData: CheckData) {
    const existingUser = this.users.find(user => user.email === signUpData.email);

    if (existingUser) {
      this.signUpErrors.email = 'User with this email already exists';
      return false;
    }

    const { errors, isValid } = validateSignUpData(signUpData);
    this.signUpErrors = errors;

    if (isValid) {
      this.user = { email: signUpData.email, password: signUpData.password, fio: '', image: null, basketItems: BasketStore.basketItems};
      this.users.push(this.user);
      localStorage.setItem('users', JSON.stringify(this.users));
      const token = generateJWT(signUpData.email, signUpData.password);
      this.token = token;
      this.isAuthenticated = true;

      localStorage.setItem('token', token);

      return true;
    }
    return false;
  }

  login(loginData: Data) {
    this.getUsers();
    const { errors, isValid } = validateLoginData(loginData);
    this.loginErrors = errors;
  
    if (isValid) {
      const userFromStore = this.getUser(loginData.email);
      if (userFromStore) {
        if (userFromStore.password === loginData.password) {
          const userBasketItems = Array.isArray(userFromStore.basketItems) ? userFromStore.basketItems : [];
          const basketItems = BasketStore.basketItems;
          const updatedUser = {
            ...userFromStore,
            basketItems: [...userBasketItems, ...basketItems] 
          };

          this.token = generateJWT(loginData.email, loginData.password);
          this.isAuthenticated = true;
          this.user = updatedUser;  
          BasketStore.basketItems=[...userBasketItems, ...basketItems];
          localStorage.setItem('token', this.token);
          rootStore.QueryStore.setQueryParam('auth', this.token);
          return true;
        }
      }
    }
  
    return false;
  }
  

  updateUserProfile(email: string, fio: string, image: string) {
    if (this.user) {
      if (this.user.fio !== fio) {
        this.user.fio = fio;
      }
      if (this.user.image !== image) {
        this.user.image = image;
      }
      this.saveUsersToLocalStorage(email);
    }
  }

  saveUsersToLocalStorage(email: string) {
    // Проверяем, что this.user не равен null
    if (this.user) {
      const userIndex = this.users.findIndex(user => user.email === email);
  
      if (userIndex !== -1) {
        this.users[userIndex] = this.user; // Присваиваем только если this.user не null
      } else {
        this.users.push(this.user); // Добавляем пользователя, если его нет в списке
      }
  

      localStorage.setItem('users', JSON.stringify(this.users));
      console.log(toJS(localStorage.getItem('users'))); 
    } else {
      console.error("User is null, cannot save to localStorage");
    }
  }
  

  logout() {
    this.token = null;
    BasketStore.clearBasket();
    this.isAuthenticated = false;
    rootStore.QueryStore.deleteQueryParam('auth');
  }

  initializeParams() {
    rootStore.QueryStore.setQueryParam('auth', this.token);
  }
}

export default new AuthStore();