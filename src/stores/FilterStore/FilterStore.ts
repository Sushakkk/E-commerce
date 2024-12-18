import { makeAutoObservable, action, observable, runInAction } from 'mobx';
import axios from 'axios';
import { Option } from 'components/MultiDropdown';
import QueryStore from 'stores/QueryStore/QueryStore';
import { Meta } from 'enums/Meta';
import ProductsStore from 'stores/ProductsStore/ProductsStore';
import { ILocalStore } from 'stores/ILocalStore/ILocalStore';

class FilterStore implements ILocalStore {
  private _categories: Option[] = [];
  searchQuery: string = '';
  selectedCategory: Option | null = null;
  meta: Meta = Meta.init;
  ParamsMeta: Meta = Meta.init;

  searchValue: string = '';

  // Private instance of ProductsStore
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
    });

    this.initializeParams();
  }

  private async initializeParams() {
    this.ParamsMeta = Meta.loading;

    const search = QueryStore.getQueryParam('search');
    const categoryId = QueryStore.getQueryParam('category');

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
    QueryStore.setQueryParam('search', query);
    QueryStore.deleteQueryParam('page');
  }

  setSelectedCategory(categoryId: number | null) {
    const category = this.getCategoryById(categoryId);
    this.selectedCategory = category;
    QueryStore.setQueryParam('category', categoryId);
    QueryStore.deleteQueryParam('page');
  }

  getCategoryById(categoryId: number | null): Option | null {
    if (categoryId === null) return null;
    const foundCategory = this._categories.find((category) => category.key === categoryId);
    return foundCategory || null;
  }

  getCategories() {
    return this._categories;
  }

  handleCategoryChange(category: Option | null) {
    this.setSelectedCategory(category?.key || null);
    // Using the private instance of ProductsStore
    this.localProductsStore.setCurrentPage(1);
  }

  applySearch() {
    this.setSearchQuery(this.searchValue);
    // Using the private instance of ProductsStore
    this.localProductsStore.fetchProducts(this.searchQuery, this.selectedCategory?.key);
    QueryStore.updateQueryParams();
  }

  async fetchCategories() {
    if (this._categories.length > 0) return;

    this.meta = Meta.loading;
    try {
      const categoriesResponse = await axios.get('https://api.escuelajs.co/api/v1/categories');
      const categories = categoriesResponse.data.map((category: { id: number; name: string }) => ({
        key: category.id,
        value: category.name,
      }));
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
