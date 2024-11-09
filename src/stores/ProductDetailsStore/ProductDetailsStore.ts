// src/stores/ProductDetailStore.ts
import { action, makeAutoObservable } from 'mobx';
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

  // Загрузка данных о продукте
  fetchProduct = async (id: string) => {
    this.loading = true;
    this.error = null;
    try {
      const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
      this.product = response.data;
      await this.fetchRelatedProducts(response.data.category.name, Number(id));
    } catch (e) {
      this.error = 'Failed to fetch product data';
    } finally {
      this.loading = false;
    }
  };

  // Загрузка связанных продуктов
  fetchRelatedProducts = async (categoryName: string, currentProductId: number) => {
    try {
      const response = await axios.get('https://api.escuelajs.co/api/v1/products', {
        params: { category: categoryName },
      });
      this.relatedProducts = response.data
        .filter((product: ProductI) => product.id !== currentProductId)
        .slice(0, 3); 
    } catch (e) {
      this.error = 'Failed to fetch related products';
    }
  };
}

export default new ProductDetailStore();
