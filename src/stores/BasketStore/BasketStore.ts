import { action, makeAutoObservable, observable } from 'mobx';
import { IBasketProduct } from 'modules/types';
import AuthStore from 'stores/AuthStore';


class BasketStore {
  basketItems: IBasketProduct[] = [];

  constructor() {
    makeAutoObservable(this, {
  
      addToBasket:action,
      removeFromBasket:action,
      clearBasket:action, 
      basketItems: observable

    });
  }



  addToBasket(item: IBasketProduct) {
    const existingItem = this.basketItems.find((product) => product.id === item.id);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      this.basketItems.push({ ...item, quantity: 1 });
    }
    AuthStore.saveBasketToUser();
  }

  removeFromBasket(id: string) {
    this.basketItems = this.basketItems.filter((item) => item.id !== id);
  }

  clearBasket() {
    this.basketItems = [];
  }

  get totalItems() {
    return Array.isArray(this.basketItems) ? this.basketItems.reduce((total, item) => total + (item.quantity || 1), 0) : 0;
  }

  get totalPrice() {
    return Array.isArray(this.basketItems) ? this.basketItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0) : 0;
  }
}

const basketStore = new BasketStore();
export default basketStore;
