import React, { useCallback } from 'react';
import Text from 'components/Text/Text';
import Card from 'components/Card';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import styles from './RelatedProducts.module.scss';
import { observer } from 'mobx-react-lite';
import { handleProductClick } from 'utils/navigationUtils';
import ProductDetailStore from 'stores/ProductDetailsStore';
import useImageHandler from 'hooks/useImageHandler';


interface RelatedItemsProps {
  ProductDetailsStore: ProductDetailStore;
}

const RelatedItems: React.FC<RelatedItemsProps> = observer(({ ProductDetailsStore }) => {
  const navigate = useNavigate();
  const { relatedProducts } = ProductDetailsStore;

  const productClickHandler = useCallback(handleProductClick(navigate), [navigate]);
  const { getImage } = useImageHandler();




  return (
    <div className={styles['related__cards']}>
      <Text view="p-32" weight="bold">
        Related Items
      </Text>
      <div className={styles.related__products}>
        {relatedProducts.map((relatedProduct) => (
          <Card
            key={relatedProduct.id}
            image={getImage(relatedProduct.images[0])}
            title={relatedProduct.title}
            subtitle={relatedProduct.description}
            captionSlot={relatedProduct.category.name}
            contentSlot={`$${relatedProduct.price}`}
            actionSlot={<Button>Add to Cart</Button>}
            className={styles.related_product_card}
            onClick={() => productClickHandler(relatedProduct)}
            product={{
              id: relatedProduct.id.toString(),
              name: relatedProduct.title,
              price: relatedProduct.price,
              image: relatedProduct.images[0],
            }} 
          />
        ))}
      </div>
    </div>
  );
});

export default RelatedItems;
