import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import axios from 'axios';
import { IProduct } from 'modules/types';
import { Meta } from 'enums/Meta';


class ProductDetailStore {
  product: IProduct | null = null;
  relatedProducts: IProduct[] = [];
  productCategoryId: number=0;

 
  productMeta: Meta = Meta.init;
  relatedProductsMeta: Meta = Meta.init;

 
  productError: string | null = null;
  relatedProductsError: string | null = null;

  constructor() {
    makeAutoObservable(this, {
      fetchRelatedProducts: action,
      fetchProduct: action,
      product: observable,
      relatedProducts: observable,
      productMeta: observable,
      relatedProductsMeta: observable,
      productError: observable,
      relatedProductsError: observable,
    });
  }

  // Загрузка данных о продукте
  fetchProduct = async (id: string) => {
    this.productMeta = Meta.loading;
    this.productError = null;

    try {
      const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
      runInAction(() => {
        this.product = response.data;
        this.productMeta = Meta.success;
        this.productCategoryId =  response.data.category.id
      });
    } catch (error) {
      runInAction(() => {
        this.productError = 'Failed to fetch product data';
        this.productMeta = Meta.error;
      });
    }
  };


  fetchRelatedProducts = async (id: string) => {
    this.relatedProductsMeta = Meta.loading;
    this.relatedProductsError = null;

    try {
      const response = await axios.get('https://api.escuelajs.co/api/v1/products', {
        params: {
          categoryId: this.productCategoryId,
        },
      });

      runInAction(() => {
        this.relatedProducts = response.data
          .filter((product: IProduct) => product.id !== Number(id))
          .slice(0, 3);
        this.relatedProductsMeta = Meta.success;
      });
    } catch (error) {
      runInAction(() => {
        this.relatedProductsError = 'Failed to fetch related products';
        this.relatedProductsMeta = Meta.error;
      });
    }
  };
}

export default new ProductDetailStore();
