import { ProductI } from 'modules/types';

export interface NavigateOptions {
  state?: { product: ProductI; products: ProductI[] };
}

export const handleCardClick = (
  product: ProductI,
  products: ProductI[],
  navigate: (path: string, options?: NavigateOptions) => void
) => {
  navigate(`/product/${product.id}`, {
    state: { product, products },
  });
};
