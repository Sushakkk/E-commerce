import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import axios from 'axios';
import { IProduct } from 'modules/types';
import QueryStore from 'stores/QueryStore/QueryStore';

import { Meta } from 'enums/Meta';

class ProductStore {
  products: IProduct[] = [];
  totalProducts: number = 0;
  meta: Meta = Meta.init; 
  currentPage: number = 1;
  productsPerPage: number = 9;
  totalPages: number = 1;

  constructor() {
    makeAutoObservable(this, {
      fetchProducts: action,
      setCurrentPage: action,
      products: observable,
      totalProducts: observable,
      currentPage: observable,
    });
  }

  fetchProducts = async (searchQuery: string, selectedCategoryID: number | undefined) => {
    this.meta = Meta.loading;


    
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
        this.totalProducts = totalResponse.data.length;
        this.totalPages = Math.ceil(this.totalProducts / this.productsPerPage);
        this.meta = Meta.success;
      });
    } catch {
      runInAction(() => {
        this.meta = Meta.error;
      });
    }
  };
  
  setCurrentPage = (page: number) => {
    this.currentPage = page;
    QueryStore.updateQueryParams();
  };

 
}

export default new ProductStore();
