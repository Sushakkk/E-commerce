import { makeAutoObservable, action} from 'mobx';

class QueryStore {
  private _queryParams: { [key: string]: string | number | null } = {};
  queryLoaded: boolean = false;

  constructor() {
    makeAutoObservable(this, {
      setQueryParam: action,
      updateQueryParams: action,
      setParamsFromUrl: action,
      resetQueryParams: action,
      addQueryParam:action,
    });

    this.setParamsFromUrl();
  }

  public setQueryParam(key: string, value: string | number | null) {
    if (value === null || value === '') {
      delete this._queryParams[key];
    } else {
      this._queryParams[key] = value;
    }
    this.updateQueryParams();
  }

  public setParamsFromUrl() {
    const params = new URLSearchParams(window.location.search);
    params.forEach((value, key) => {
      if (value) {
        this._queryParams[key] = value;
      }
    });

    this.queryLoaded = true;
  }

  updateQueryParams() {
    const params = new URLSearchParams();
    Object.keys(this._queryParams).forEach((key) => {
      const value = this._queryParams[key];
      if (value !== null && value !== undefined && value !== '') {
        params.set(key, String(value));
      }
    });

    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
  }

  public getQueryParam(key: string) {
    return this._queryParams[key] || null;
  }

  public getQueryParams() {
    return this._queryParams || null;
  }

  public deleteQueryParam(key: string) {
    delete this._queryParams[key];
    this.updateQueryParams();
  }
  
  public resetQueryParams() {
    this._queryParams= {}
  }

  public addQueryParam(key: string, value: string | number) {
    const params = new URLSearchParams(window.location.search);
    params.set(key, String(value));
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
  }
 


  
}

export default QueryStore;
