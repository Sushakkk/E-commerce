import { makeAutoObservable, action} from 'mobx';
import FilterStore from 'stores/FilterStore/FilterStore';
import ProductStore from 'stores/ProductStore/ProductStore';


class QueryStore {
    queryLoaded: boolean= false;
  



  constructor() {
    makeAutoObservable(this, {
      setQueryParams: action,
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


 
}

export default new QueryStore();
