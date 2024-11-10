// src/stores/ProductDetailStore.ts
import { action, makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import { ProductI } from 'modules/types';

class ProductDetailStore {
  product: ProductI | null = null;
  relatedProducts: ProductI[] = [];
  loading: boolean = false;
  error: string | null = null;

 
  constructor() {
    makeAutoObservable(this, {
      fetchRelatedProducts: action,
      fetchProduct: action,
    });
  }


  fetchProduct = async (id: string) => {
    this.loading = true;
    this.error = null;
    try {
      const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
      runInAction(() => {
      this.product = response.data;
      });
      await this.fetchRelatedProducts(response.data.category.id, Number(id));
    } catch {
      runInAction(() => {
      this.error = 'Failed to fetch product data';
      });
    } finally {
      runInAction(() => {
      this.loading = false;
      });
    }
  };


  fetchRelatedProducts = async (selectedCategoryID: number, currentProductId: number) => {
    try {
      const response = await axios.get('https://api.escuelajs.co/api/v1/products', {
        params: {
          categoryId: selectedCategoryID,
        },
      });

      runInAction(() => {
      this.relatedProducts = response.data
        .filter((product: ProductI) => product.id !== currentProductId)
        .slice(0, 3); 
      });
    } catch{
      runInAction(() => {
        this.error = 'Failed to fetch related products';
      });
    }
  };
}

export default new ProductDetailStore();
