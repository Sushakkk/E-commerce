import React, { useCallback } from 'react';
import Text from 'components/Text/Text';
import Button from 'components/Button';
import styles from './ProductDetails.module.scss';
import { observer } from 'mobx-react-lite';
import ProductDetailStore from 'stores/ProductDetailsStore';
import basketStore from 'stores/BasketStore';


interface ProductDetailsProps {
  ProductDetailsStore: ProductDetailStore;
}

const ProductDetails: React.FC<ProductDetailsProps> = observer(({ ProductDetailsStore }) => {
  const { product } = ProductDetailsStore;


const handleAddToCart = useCallback(() => {
  if (product) {
    basketStore.addToBasket({
      id: product.id.toString(),
      name: product.title,
      price: product.price,
      image: product.images[0], 
    });
  }
}, [product, basketStore]);

  if (!product) {
    return <div>Товар не найден</div>;
  }

  return (
    <div className={styles['product__text-container']}>
      <div className={styles.product__text_title}>
        <Text view="title" weight="bold">
          {product.title}
        </Text>
        <Text view="p-20" color="secondary">
          {product.description}
        </Text>
      </div>
      <div className={styles.product__price}>
        <Text view="title" className="page-title-price" weight="bold">
          ${product.price}
        </Text>
        <div className={styles.product__buttons}>
          <Button className={styles["buy-now-button"]}>Buy Now</Button>
          <Button className={styles["add-to-cart-button"]} onClick={handleAddToCart}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
});

export default ProductDetails;
