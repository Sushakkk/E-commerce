import { action, makeAutoObservable } from 'mobx';
import axios from 'axios';
import { ProductI } from 'modules/types';
import { NavigateFunction } from 'react-router-dom';


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
    });
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

    } catch {
      this.error = 'Ошибка при загрузке продуктов';
    } finally {
      this.loading = false;
    }
  };
  
  setCurrentPage = (page: number) => {
    this.currentPage = page;
  };

  handleProductClick = (product: ProductI, navigate: NavigateFunction) => {
    navigate(`/product/${product.id}`);
  };
}

export default new ProductStore();
