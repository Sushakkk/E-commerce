import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import Card from 'components/Card';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import ProductsStore from 'stores/ProductsStore/ProductsStore';
import styles from './ProductList.module.scss';
import Text from 'components/Text/Text';
import { handleProductClick } from 'utils/navigationUtils';
import useImageHandler from 'hooks/useImageHandler';


interface ProductListProps {
  productsStore: ProductsStore;
}

const ProductList: React.FC<ProductListProps> = observer(({ productsStore }) => {
  const navigate = useNavigate();
  const { products, totalPages } = productsStore;
  const { getImage } = useImageHandler();

  const productClickHandler = useCallback(handleProductClick(navigate), [navigate]);

  
  

  if (!totalPages) {
    return (
      <section className={styles['products__not-found']}>
        <Text view="p-32" className="page-title" weight="bold">
          No products found
        </Text>
      </section>
    );
  }

  return (
    <section className={styles['products__cards']}>
      {products.map((product) => (
        <div className={styles['products__column']} key={product.id}>
          <Card
            image={getImage(product.images[0])}
            title={product.title}
            subtitle={product.description}
            captionSlot={product.category.name}
            contentSlot={`$${product.price}`}
            actionSlot={<Button>Add to Cart</Button>}
            className={styles['products__card']}
            onClick={() => productClickHandler(product)}
            product={{
              id: product.id.toString(),
              name: product.title,
              price: product.price,
              image: product.images[0],
            }} 
          />
        </div>
      ))}
    </section>
  );
});

export default ProductList;
