import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import ProductStore from 'stores/ProductStore/ProductStore';  // Импортируем ProductStore
import { Option } from 'components/MultiDropdown';

class FilterStore {
  categories: Option[] = [];
  searchQuery: string = '';
  selectedCategory: Option | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
   
  }
  setSelectedCategory(category: Option | null) {
    this.selectedCategory = category;  

  }

  // Загружаем категории
  async fetchCategories() {
    try {
      const response = await axios.get('https://api.escuelajs.co/api/v1/categories');
      this.categories = response.data.map((category: { id: number; name: string }) => ({
        key: category.id,
        value: category.name,
      }));
    } catch (error) {
      console.error('Ошибка при загрузке категорий', error);
    }
  }

 
}

export default new FilterStore();
