import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import ProductStore from 'stores/ProductStore/ProductStore';  // Импортируем ProductStore

class FilterStore {
  categories: { key: string, value: string }[] = [];
  searchQuery: string = '';
  selectedCategory: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Устанавливаем строку поиска
  setSearchQuery(query: string) {
    this.searchQuery = query;
    this.fetchProducts();  // После изменения запроса ищем продукты
  }

  // Устанавливаем выбранную категорию
  setSelectedCategory(category: string | null) {
    this.selectedCategory = category;
    this.fetchProducts();  // После изменения категории ищем продукты
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
    ProductStore.fetchProducts(this.searchQuery, this.selectedCategory);  // Передаем параметры в ProductStore
  }
}

export default new FilterStore();
