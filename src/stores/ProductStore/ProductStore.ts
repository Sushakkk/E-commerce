import { action, makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import { ProductI } from 'modules/types';

class ProductStore {
  products: ProductI[] = [];
  totalProducts: number = 0;
  productsLoaded: boolean= false;
  error: string | null = null;
  currentPage: number = 1;
  productsPerPage: number = 9;
  totalPages: number = 1;

  constructor() {
    makeAutoObservable(this, {
      fetchProducts: action,
      setCurrentPage: action,
    });

  }

 

  fetchProducts = async (searchQuery: string, selectedCategoryID: number | undefined) => {
    try {
      const [productsResponse, totalResponse] = await Promise.all([
        axios.get('https://api.escuelajs.co/api/v1/products', {
          params: {
            offset: (this.currentPage - 1) * this.productsPerPage,
            limit: this.productsPerPage,
            title: searchQuery,
            categoryId: selectedCategoryID,
          },
        }),
        axios.get('https://api.escuelajs.co/api/v1/products', {
          params: {
            limit: 0,
            title: searchQuery,
            categoryId: selectedCategoryID,
          },
        }),
      ]);

    
      runInAction(() => {
        this.products = productsResponse.data;
        this.productsLoaded = true;
        this.totalProducts = totalResponse.data.length;
        this.totalPages = Math.ceil(this.totalProducts / this.productsPerPage);
      });
    } catch (e) {
      runInAction(() => {
        this.error = 'Ошибка при загрузке продуктов';
      });
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