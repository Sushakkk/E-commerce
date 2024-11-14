import { makeAutoObservable, action } from 'mobx';

class QueryStore {
  queryParams: { [key: string]: string | number | null } = {};
  queryLoaded: boolean = false;

  constructor() {
    makeAutoObservable(this, {
      setQueryParam: action,
      updateQueryParams: action,
      setParamsFromUrl: action,
    });

 
    this.setParamsFromUrl();
  }


  setQueryParam(key: string, value: string | number | null) {
    if (value === null || value === '') {
      delete this.queryParams[key];
    } else {
      this.queryParams[key] = value;
    }
    this.updateQueryParams();
  }

  
  setParamsFromUrl() {
    const params = new URLSearchParams(window.location.search);
    params.forEach((value, key) => {
      if (value) {
        this.queryParams[key] = value;
        
      }
    });
    
    this.queryLoaded = true;
  }


  updateQueryParams() {
    const params = new URLSearchParams();
    Object.keys(this.queryParams).forEach((key) => {
      const value = this.queryParams[key];
      if (value !== null && value !== undefined && value !== '') {
        params.set(key, String(value));
      }
    });

  

    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
  }


  getQueryParam(key: string) {
    return this.queryParams[key] || null;
  }

  deleteQueryParam(key: string) {
  
    delete this.queryParams[key];
    this.updateQueryParams();
  }
}

export default new QueryStore();
