import { action, makeAutoObservable } from 'mobx';
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
      fetchProducts: action,
      setCurrentPage: action,
      syncWithQueryParams: action,
    });

    this.syncWithQueryParams();
  }

  // Метод для синхронизации currentPage с query-параметрами при загрузке
  syncWithQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const pageParam = parseInt(params.get('page') || '1', 10);
    this.setCurrentPage(pageParam);
  }

  fetchProducts = async (searchQuery: string, selectedCategoryID: number | undefined) => {
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
         params: {
          limit: 0,
          title: searchQuery,
          categoryId: selectedCategoryID,
        },
      });
      this.totalProducts = totalResponse.data.length;
      this.totalPages = Math.ceil(this.totalProducts / this.productsPerPage);

    } catch (e) {
      this.error = 'Ошибка при загрузке продуктов';
    } finally {
      this.loading = false;
    }
  };
  
  setCurrentPage = (page: number) => {
    this.currentPage = page;
    this.updateQueryParams();
  };

  updateQueryParams() {
    const params = new URLSearchParams(window.location.search);
    if (this.currentPage > 1) {
      params.set('page', String(this.currentPage));
    } else {
      params.delete('page');
    }
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
  }

  handleProductClick = (product: ProductI, navigate: Function) => {
    navigate(`/product/${product.id}`);
  };
}

export default new ProductStore();