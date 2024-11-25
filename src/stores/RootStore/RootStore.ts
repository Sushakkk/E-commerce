import QueryStore from "stores/RootStore/QueryStore/QueryStore";
import BasketStore from "stores/BasketStore";
import AuthStore from "stores/AuthStore";


export default class RootStore {
    readonly QueryStore = new QueryStore();
    readonly BasketStore = new BasketStore();
    readonly AuthStore = new AuthStore(); 
}

