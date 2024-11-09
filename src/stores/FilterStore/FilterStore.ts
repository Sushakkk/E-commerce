// stores/FilterStore/FilterStore.ts
import { makeAutoObservable } from 'mobx';
import axios from 'axios';

class FilterStore {
  searchQuery: string = '';
  selectedCategory: string | null = null;
  categories: { id: string; name: string }[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  // Загрузка категорий
  fetchCategories = async () => {
    try {
      const response = await axios.get('https://api.escuelajs.co/api/v1/categories');
      this.categories = response.data;
    } catch (e) {
      console.error('Failed to fetch categories');
    }
  };

  // Установка поискового запроса
  setSearchQuery(query: string) {
    this.searchQuery = query;
  }

  // Установка выбранной категории
  setSelectedCategory(category: string | null) {
    this.selectedCategory = category;
  }
}

export default new FilterStore();
