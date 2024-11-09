import { makeAutoObservable, action, computed, observable } from 'mobx';
import axios from 'axios';
import { ProductI } from 'modules/types';


class ProductStore {
  products: ProductI[] = [];
  totalProducts: number = 0;
  loading: boolean = false;
  error: string | null = null;
  currentPage: number = 1;
  productsPerPage: number = 9;
  totalPages: number = 1;

  constructor() {
    makeAutoObservable(this, {
      products: observable,
      totalProducts: observable,
      loading: observable,
      error: observable,
      currentPage: observable,
      totalPages: observable,
      fetchProducts: action,
      setCurrentPage: action,
      handleProductClick: action,
      getProducts: computed,
    });
  }

  // Загрузка всех продуктов
  fetchProducts = async (searchQuery: string, selectedCategoryID: number | null) => {
    this.loading = true;
    this.error = null;

    try {
      const response = await axios.get('https://api.escuelajs.co/api/v1/products', {
        params: {
          title: searchQuery,
          categoryId: selectedCategoryID,
        },
      });
      this.products = response.data;
      this.totalProducts = this.products.length;
      this.totalPages = Math.ceil(this.totalProducts / this.productsPerPage);
    } catch (e) {
      this.error = 'Ошибка при загрузке продуктов';
    } finally {
      this.loading = false;
    }
  };

  // Вычисляемое свойство для получения текущих продуктов
  get getProducts() {
    const start = (this.currentPage - 1) * this.productsPerPage;
    const end = start + this.productsPerPage;
    return this.products.slice(start, end);
  }

  // Установка текущей страницы
  setCurrentPage = (page: number) => {
    this.currentPage = page;
  };

  // Обработчик клика по продукту
  handleProductClick = (product: ProductI, navigate: Function) => {
    navigate(`/product/${product.id}`);
  };
}

export default new ProductStore();
