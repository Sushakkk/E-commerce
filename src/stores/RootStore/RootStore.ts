import QueryStore from "stores/RootStore/QueryStore/QueryStore";
import AuthStore from "stores/RootStore/AuthStore/AuthStore";

export default class RootStore {
    readonly QueryStore = new QueryStore();
    readonly AuthStore = new AuthStore();
  }