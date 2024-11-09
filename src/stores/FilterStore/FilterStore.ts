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

  // Устанавливаем строку поиска
  setSearchQuery(query: string) {
    this.searchQuery = query;
    this.fetchProducts();  // Обновляем продукты при изменении запроса
  }

  // Устанавливаем выбранную категорию
  setSelectedCategory(category: Option | null) {
    this.selectedCategory = category;  // Устанавливаем новый объект Option
    this.fetchProducts();  // Обновляем продукты при изменении категории
  }

  // Загружаем категории
  async fetchCategories() {
    try {
      const response = await axios.get('https://api.escuelajs.co/api/v1/categories');
      this.categories = response.data.map((category: { id: string; name: string }) => ({
        key: category.id,
        value: category.name,
      }));
    } catch (error) {
      console.error('Ошибка при загрузке категорий', error);
    }
  }

  // Перезапрашиваем продукты с новыми фильтрами
  fetchProducts() {
    ProductStore.fetchProducts(this.searchQuery, this.selectedCategory ? Number(this.selectedCategory.key): null);
  }
}

export default new FilterStore();
