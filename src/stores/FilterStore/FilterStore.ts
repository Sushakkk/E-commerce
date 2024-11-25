import { makeAutoObservable, action, observable, runInAction } from 'mobx';
import axios from 'axios';
import { Option } from 'components/MultiDropdown';
import { Meta } from 'enums/Meta';
import ProductsStore from 'stores/ProductsStore/ProductsStore';
import { ILocalStore } from 'stores/ILocalStore/ILocalStore';
import rootStore from 'stores/RootStore/instance';

class FilterStore implements ILocalStore {
  private _categories: Option[] = [];
  searchQuery: string = '';
  selectedCategory: Option | null = null;
  meta: Meta = Meta.init;
  ParamsMeta: Meta = Meta.init;

  searchValue: string = '';

  
  private localProductsStore = new ProductsStore();

  constructor() {
    makeAutoObservable(this, {
      searchQuery: observable,
      selectedCategory: observable,
      meta: observable,
      applySearch: action,
      setSearchQuery: action,
      setSelectedCategory: action,
      fetchCategories: action,
      initializeParams: action,
    });

    this.fetchCategories()
  }

 async initializeParams() {
    this.ParamsMeta = Meta.loading;

    const search =  rootStore.QueryStore.getQueryParam('search');
    const categoryId =  rootStore.QueryStore.getQueryParam('category');

    if (search) {
      this.setSearchQuery(String(search));
      this.setSearchValue(String(search));
    }

    await this.fetchCategories();

    runInAction(() => {
      if (categoryId) {
        this.setSelectedCategory(Number(categoryId));
      }
      this.ParamsMeta = Meta.success;
    });
  }

  setSearchValue(value: string) {
    this.searchValue = value;
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
    rootStore.QueryStore.setQueryParam('search', query);
  }

  setSelectedCategory(categoryId: number | null) {
    const category = this.getCategoryById(categoryId);
    this.selectedCategory = category;
    rootStore.QueryStore.setQueryParam('category', categoryId);
  }

  getCategoryById(categoryId: number | null): Option | null {
    if (categoryId === null) return null;
    const foundCategory = this._categories.find((category) => category.key === categoryId);
    return foundCategory || null;
  }

  getCategories() {
    return this._categories;
  }
  reset() {
    rootStore.QueryStore.deleteQueryParam('search');
    rootStore.QueryStore.deleteQueryParam('category');

}

  handleCategoryChange(category: Option | null) {
    this.setSelectedCategory(category?.key || null);
    this.localProductsStore.setCurrentPage(1);
  }

  applySearch() {
    this.setSearchQuery(this.searchValue);
    rootStore.QueryStore.deleteQueryParam('page');
    this.localProductsStore.fetchProducts(this.searchQuery, this.selectedCategory?.key, null);
    rootStore.QueryStore.updateQueryParams();
  }

  async fetchCategories() {
    if (this._categories.length > 0) return;

    this.meta = Meta.loading;
    try {
      const categoriesResponse = await axios.get('https://api.escuelajs.co/api/v1/categories');
      
      const categories = await Promise.all(
        categoriesResponse.data
          .filter((category: { name: string }) => category.name !== 'New Category')
          .map(async (category: { id: number; name: string; image: string }) => {
            const productCountResponse = await axios.get(`https://api.escuelajs.co/api/v1/products?categoryId=${category.id}`);
            const productCount = productCountResponse.data.length;

            return {
              key: category.id,
              value: category.name,
              img: category.image,
              productCount: productCount, 
            };
          })
      );

      runInAction(() => {
        this._categories = categories;
        this.meta = Meta.success;
      });
    } catch {
      runInAction(() => {
        this.meta = Meta.error;
      });
    }
  }



  destroy(): void {
    this._categories = [];
    this.searchQuery = '';
    this.selectedCategory = null;
    this.meta = Meta.init;
    this.ParamsMeta = Meta.init;
    this.searchValue = '';
  }
}

export default FilterStore;
