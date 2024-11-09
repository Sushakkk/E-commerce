import React from 'react';
import Text from 'components/Text/Text';
import Card from 'components/Card';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import styles from './RelatedProducts.module.scss';
import ProductDetailsStore from 'stores/ProductDetailsStore/ProductDetailsStore';
import ProductStore from 'stores/ProductStore/ProductStore';
import { observer } from 'mobx-react-lite';



const RelatedItems: React.FC = () => {
    const navigate = useNavigate();



  const { relatedProducts} = ProductDetailsStore; 



    return (
        <div className={styles['related__cards']}>
            <Text view="p-32" weight="bold">
                Related Items
            </Text>
            <div className={styles.related__products}>
                {relatedProducts.map((relatedProduct) => (
                    <Card
                        key={relatedProduct.id}
                        image={relatedProduct.images[0]}
                        title={relatedProduct.title}
                        subtitle={relatedProduct.description}
                        captionSlot={relatedProduct.category.name}
                        contentSlot={`$${relatedProduct.price}`}
                        actionSlot={<Button>Add to Cart</Button>}
                        className={styles.related_product_card}
                        onClick={() => ProductStore.handleProductClick(relatedProduct,navigate )}
                    />
                ))}
            </div>
        </div>
    );
};

export default observer(RelatedItems);
