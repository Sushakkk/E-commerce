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

    // Инициализация параметров из текущего URL
    this.setParamsFromUrl();
  }

  // Устанавливаем/обновляем конкретный параметр
  setQueryParam(key: string, value: string | number | null) {
    console.log(`setQueryParam called with key: ${key}, value: ${value}`); // Логируем изменения
    if (value === null || value === '') {
      // Удаляем параметр, если значение пустое или null
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
        console.log(this.queryParams);
        
      }
    });
    
    this.queryLoaded = true;
  }

  // Обновляем URL с текущими параметрами
  updateQueryParams() {
    const params = new URLSearchParams();
    Object.keys(this.queryParams).forEach((key) => {
      const value = this.queryParams[key];
      // Добавляем параметр в URL, только если его значение не пустое
      if (value !== null && value !== undefined && value !== '') {
        params.set(key, String(value));
      }
    });

  
    // Обновляем URL без перезагрузки страницы
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
  }


  getQueryParam(key: string) {
   
    return this.queryParams[key] || null;
  }

  // Удаление параметра
  deleteQueryParam(key: string) {
  
    delete this.queryParams[key];
    this.updateQueryParams();
  }
}

export default new QueryStore();
