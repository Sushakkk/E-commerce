import { makeAutoObservable, action, observable, runInAction } from 'mobx';
import axios from 'axios';
import { Option } from 'components/MultiDropdown';
import ProductStore from 'stores/ProductStore/ProductStore';

class FilterStore {
  categories: Option[] = [];
  searchQuery: string = '';
  selectedCategory: Option | null = null;
  filtersLoaded = false;
  error: string | null = null;


  constructor() {
    makeAutoObservable(this, {
      categories: observable,
      searchQuery: observable,
      selectedCategory: observable,
      setSearchQuery: action,
      setSelectedCategory: action,
      fetchCategories: action,
    });
  }



  setSearchQuery(searchQuery: string) {
    this.searchQuery = searchQuery;
    
  }

  applySearch() {
    ProductStore.fetchProducts(this.searchQuery, this.selectedCategory?.key);
    this.updateQueryParams();
  }


  setSelectedCategory(category: Option | null) {
    this.selectedCategory = category;
    this.updateQueryParams();
  }

  updateQueryParams() {
    const params = new URLSearchParams(window.location.search);
    if (this.searchQuery) {
      params.set('search', this.searchQuery);
    } else {
      params.delete('search');
    }
    if (this.selectedCategory) {
      params.set('category', String(this.selectedCategory.key));
    } else {
      params.delete('category');
    }
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
  }

  async fetchCategories() {
    if (this.categories.length > 0) return; 
    try {
      const categoriesResponse = await axios.get('https://api.escuelajs.co/api/v1/categories');
      const categories = categoriesResponse.data.map((category: { id: number; name: string }) => ({
        key: category.id,
        value: category.name,
      }));

      const categoryPromises = categories.map((category: Option) =>
        axios.get('https://api.escuelajs.co/api/v1/products', {
          params: {
            categoryId: category.key,
            limit: 1, 
          },
        }).then((response) => {
          if (response.data.length > 0) {
            return category;
          }
          return null; 
        })
      );

      const validCategories = (await Promise.all(categoryPromises)).filter(Boolean) as Option[];

      runInAction(() => {
      this.categories = validCategories;
      this.filtersLoaded = true;
      });
    } catch (error) {
      this.error = 'Ошибка при загрузке фильтров';
    }
  }
}

export default new FilterStore();
