import { action, makeAutoObservable, observable} from 'mobx';
import { IBasketProduct } from 'modules/types';
import rootStore from 'stores/RootStore';




class BasketStore {
  basketItems: IBasketProduct[] = [];
 

  constructor() {

    makeAutoObservable(this, {
      addToBasket: action,
      removeFromBasket: action,
      clearBasket: action,
      basketItems: observable,
    });

    this.loadBasketFromLocalStorage(); 
  }

  saveBasketToLocalStorage() {
    try {
      localStorage.setItem("basket", JSON.stringify(this.basketItems));
      
    } catch (error) {
      console.error("Error saving basket to localStorage:", error);
    }
  }

  loadBasketFromLocalStorage() {
    try {
      const storedBasket = localStorage.getItem("basket");
      if (storedBasket) {
        this.basketItems = JSON.parse(storedBasket);
      }
    } catch (error) {
      console.error("Error loading basket from localStorage:", error);
    }
  }

  addToBasket(item: IBasketProduct) {

    
    const existingItem = this.basketItems.find((product) => product.id === item.id);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      this.basketItems.push({ ...item, quantity: 1 });
    }
    this.saveBasketToLocalStorage(); // Сохранение корзины
   rootStore.AuthStore.saveBasketToUser(); // Синхронизация с пользователем
  }

  incrementQuantity(id: string) {
    const item = this.basketItems.find((product) => product.id === id);
    if (item) {
      item.quantity = (item.quantity || 1) + 1;
    }
    this.saveBasketToLocalStorage(); // Сохранение корзины
    rootStore.AuthStore.saveBasketToUser(); // Синхронизация с пользователем
  }

  decrementQuantity(id: string) {
    const item = this.basketItems.find((product) => product.id === id);
    if (item) {
      item.quantity = Math.max((item.quantity || 1) - 1, 1); // Минимум 1 товар
    }
    this.saveBasketToLocalStorage(); // Сохранение корзины
    rootStore.AuthStore.saveBasketToUser(); // Синхронизация с пользователем
  }

  removeFromBasket(id: string) {
    this.basketItems = this.basketItems.filter((item) => item.id !== id);
    this.saveBasketToLocalStorage(); // Сохранение корзины
    rootStore.AuthStore.saveBasketToUser();
  }

  clearBasket() {
    this.basketItems = [];
    this.saveBasketToLocalStorage();
    if ( rootStore.AuthStore.user) {
      rootStore.AuthStore.user.basketItems = this.basketItems;
      rootStore.AuthStore.saveBasketToUser();
    }
  }
  get totalItems() {
    return Array.isArray(this.basketItems)
      ? this.basketItems.reduce((total, item) => total + (item.quantity || 1), 0)
      : 0;
  }

  get totalPrice() {
    return Array.isArray(this.basketItems)
      ? this.basketItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0)
      : 0;
  }
}


export default BasketStore;