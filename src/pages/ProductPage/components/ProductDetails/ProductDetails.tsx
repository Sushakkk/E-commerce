import React from 'react';
import Text from 'components/Text/Text';
import Button from 'components/Button';
import styles from './ProductDetails.module.scss';
import ProductDetailsStore from 'stores/ProductDetailsStore/ProductDetailsStore';


const ProductDetails: React.FC = () => {
    const {product} = ProductDetailsStore;

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
                    <Button className={styles["add-to-cart-button"]}>Add to Cart</Button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
