import { makeAutoObservable, action, observable, runInAction, toJS } from 'mobx';
import axios from 'axios';
import { Option } from 'components/MultiDropdown';
import ProductStore from 'stores/ProductStore/ProductStore';
import QueryStore from 'stores/QueryStore/QueryStore';
import { Meta } from 'enums/Meta';

class FilterStore {
  private _categories: Option[] = [];
  searchQuery: string = '';
  selectedCategory: Option | null = null;
  meta: Meta = Meta.init;
  ParamsMeta: Meta = Meta.init;

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
    this.ParamsMeta= Meta.loading
    const search = QueryStore.getQueryParam('search');
    const categoryId = QueryStore.getQueryParam('category');
    
    if (search) this.setSearchQuery(String(search));
    if (categoryId) this.setSelectedCategory(Number(categoryId));

    await this.fetchCategories();
    
    if (categoryId) {
      this.setSelectedCategory(Number(categoryId));
    }
    this.ParamsMeta = Meta.success
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
    QueryStore.setQueryParam('search', query); 
  }

  setSelectedCategory(categoryId: number | null) {
    const category = this.getCategoryById(categoryId);
    this.selectedCategory = category;
    QueryStore.setQueryParam('category', categoryId);
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
    ProductStore.setCurrentPage(1); 
  }

  handleSearchChange = (value: string) => {
    this.setSearchQuery(value);
    this.applySearch();
  };

  applySearch() {
    ProductStore.fetchProducts(this.searchQuery, this.selectedCategory?.key);
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
}

export default new FilterStore();