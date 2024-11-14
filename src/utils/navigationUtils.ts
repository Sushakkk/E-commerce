
import { IProduct } from "modules/types";
import { NavigateFunction } from "react-router-dom";

export const handleProductClick = (navigate: NavigateFunction) => {
  return (product: IProduct) => {
    navigate(`/product/${product.id}`);
  };
};
