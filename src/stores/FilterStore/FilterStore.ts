import { makeAutoObservable, action, observable } from 'mobx';
import axios from 'axios';
import { Option } from 'components/MultiDropdown';


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

  setSearchQuery(searchQuery: string) {
    this.searchQuery = searchQuery;
  }


  setSelectedCategory(category: Option | null) {
    this.selectedCategory = category;
  }

 
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
