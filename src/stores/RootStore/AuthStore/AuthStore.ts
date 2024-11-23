import { makeAutoObservable } from 'mobx';

class AuthStore {
  token: string | null = null;
  isAuthenticated: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  // Метод для логина, сохраняет токен в состоянии и в localStorage
  login(token: string) {
    this.token = token;
    this.isAuthenticated = true;
    localStorage.setItem('token', token);
  }

  // Метод для логаута, удаляет токен из состояния и из localStorage
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    localStorage.removeItem('token');
  }

  // Метод для инициализации состояния на основе localStorage
  checkAuth() {
    const token = localStorage.getItem('token');
    if (token) {
      this.token = token;
      this.isAuthenticated = true;
    }
  }
}


export default  AuthStore;
