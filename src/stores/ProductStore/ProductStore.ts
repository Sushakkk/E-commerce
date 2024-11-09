import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { ProductI } from 'modules/types';
import FilterStore from 'stores/FilterStore/FilterStore'; // Импортируем FilterStore для фильтров

class ProductStore {
  products: ProductI[] = [];
  totalProducts: number = 0;
  loading: boolean = false;
  error: string | null = null;
  currentPage: number = 1;
  productsPerPage: number = 9;

  constructor() {
    makeAutoObservable(this);
  }

  // Загрузка товаров на основе фильтров
  fetchProducts = async (searchQuery: string, selectedCategoryID: number | null) => {
    this.loading = true;
    this.error = null;

    try {
      const response = await axios.get('https://api.escuelajs.co/api/v1/products', {
        params: {
          offset: (this.currentPage - 1) * this.productsPerPage,
          limit: this.productsPerPage,
          title: searchQuery,
          categoryId: selectedCategoryID,
        },
      });
      this.products = response.data;

      const totalResponse = await axios.get('https://api.escuelajs.co/api/v1/products', {
        params: { limit: 0, categoryId: selectedCategoryID },
      });
      this.totalProducts = totalResponse.data.length;
    } catch (e) {
      this.error = 'Ошибка при загрузке продуктов';
    } finally {
      this.loading = false;
    }
  };

  setCurrentPage = (page: number) => {
    this.currentPage = page;
  };

  handleProductClick = (product: ProductI, navigate: Function) => {
    navigate(`/product/${product.id}`);
  };
}

export default new ProductStore();
