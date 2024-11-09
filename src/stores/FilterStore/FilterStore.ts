import { makeAutoObservable, action, observable } from 'mobx';
import axios from 'axios';
import { Option } from 'components/MultiDropdown';
import ProductStore from 'stores/ProductStore/ProductStore';

class FilterStore {
  categories: Option[] = [];
  searchQuery: string = '';
  selectedCategory: Option | null = null;

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

  // Установка поискового запроса
  setSearchQuery(searchQuery: string) {
    this.searchQuery = searchQuery;
    // ProductStore.fetchProducts(this.searchQuery, this.selectedCategory?.key);

  }

  // Установка выбранной категории
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
