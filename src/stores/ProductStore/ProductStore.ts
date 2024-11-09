import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { ProductI } from 'modules/types';

class ProductStore {
  products: ProductI[] = [];
  totalProducts: number = 0;
  loading: boolean = false;
  error: string | null = null;
  currentPage: number = 1;
  productsPerPage: number = 9; // Количество продуктов на одной странице

  constructor() {
    makeAutoObservable(this);
  }

  fetchProducts = async (searchQuery: string, category: string | null) => {
    this.loading = true;
    this.error = null;
    try {
      const response = await axios.get('https://api.escuelajs.co/api/v1/products', {
        params: {
          offset: (this.currentPage - 1) * this.productsPerPage,
          limit: this.productsPerPage,
          search: searchQuery,
          category: category,
        },
      });
      this.products = response.data;

      const totalResponse = await axios.get('https://api.escuelajs.co/api/v1/products', {
        params: { limit: 0 },
      });
      this.totalProducts = totalResponse.data.length;
    } catch (e) {
      this.error = 'Failed to fetch products';
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
