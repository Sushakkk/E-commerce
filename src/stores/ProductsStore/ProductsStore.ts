import { action, makeAutoObservable, observable, runInAction} from 'mobx';
import axios from 'axios';
import { IProduct } from 'modules/types';
import { Meta } from 'enums/Meta';
import { ILocalStore } from 'stores/ILocalStore/ILocalStore';
import rootStore from 'stores/RootStore/instance';





class ProductsStore implements ILocalStore {
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
      meta: observable,
    });

    // this.initializeParams();
  }

  private initializeParams() {
    const page = rootStore.QueryStore.getQueryParam('page');
    
    if (page) {
      this.currentPage = Number(page);
    }
    else{
      this.currentPage = 1
    }
  }
  

  fetchProducts = async (searchQuery: string, selectedCategoryID: number | undefined, page: number | null) => {
    if (page !== null) {
      this.currentPage = page;
    } else {
      this.initializeParams();
    }
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

  reset= () => {
    this.currentPage = 1;
    rootStore.QueryStore.deleteQueryParam('page');
  };

  

  setCurrentPage = (page: number) => {
    this.currentPage = page;
  
    if (page === 1) {
      rootStore.QueryStore.deleteQueryParam('page');
    } else {
      rootStore.QueryStore.setQueryParam('page', page);
    }
  };

  
  destroy() {
    this.products = [];
    this.meta = Meta.init;
  }
}

export default ProductsStore;
