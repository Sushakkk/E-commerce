import { makeAutoObservable, action} from 'mobx';
import FilterStore from 'stores/FilterStore/FilterStore';
import ProductStore from 'stores/ProductStore/ProductStore';


class QueryStore {
    queryLoaded: boolean= false;
  



  constructor() {
    makeAutoObservable(this, {
      setQueryParams: action,
      updateQueryParams: action,
    });
  }


  setQueryParams(search:string, categoryId:string, page:string) {
    FilterStore.setSearchQuery(search);

    if(page){
        ProductStore.setCurrentPage(Number(page))
    }
    if (categoryId) {
      const category = FilterStore.categories.find(
        (cat) => cat.key === Number(categoryId)
      );
      FilterStore.setSelectedCategory(category || null);
    } else {
        FilterStore.setSelectedCategory(null);
    }
    this.queryLoaded=true
  }


  updateQueryParams() {
    const params = new URLSearchParams(window.location.search);
    if (FilterStore.searchQuery) {
      params.set('search', FilterStore.searchQuery);
    } else {
      params.delete('search');
    }
    if (FilterStore.selectedCategory) {
      params.set('category', String(FilterStore.selectedCategory.key));
    } else {
      params.delete('category');
    }
    if (ProductStore.currentPage > 1) {
      params.set('page', String(ProductStore.currentPage));
    } else {
      params.delete('page');
    }
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
  }

 
}

export default new QueryStore();
