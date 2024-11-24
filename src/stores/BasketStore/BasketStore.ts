// stores/BasketStore/BasketStore.ts
import { makeAutoObservable } from 'mobx';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity?: number; // Количество товара в корзине
}

class BasketStore {
  basketItems: Product[] = [];  // Указываем тип массива

  constructor() {
    makeAutoObservable(this);
  }

  // Метод для добавления товара в корзину
  addToBasket(item: Product) {
    const existingItem = this.basketItems.find((product) => product.id === item.id);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      this.basketItems.push({ ...item, quantity: 1 });
    }
  }

  // Метод для удаления товара из корзины по id
  removeFromBasket(id: string) {
    this.basketItems = this.basketItems.filter((item) => item.id !== id);
  }

  // Метод для очистки корзины
  clearBasket() {
    this.basketItems = [];
  }

  // Геттер для получения общего количества товаров
  get totalItems() {
    return this.basketItems.reduce((total, item) => total + (item.quantity || 1), 0);
  }

  // Геттер для получения общей стоимости товаров
  get totalPrice() {
    return this.basketItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  }
}

// Создаём экземпляр корзины для экспорта
const basketStore = new BasketStore();
export default basketStore;
