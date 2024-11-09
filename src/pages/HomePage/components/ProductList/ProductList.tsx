import React from 'react';
import { observer } from 'mobx-react-lite';
import Card from 'components/Card';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import ProductStore from 'stores/ProductStore/ProductStore';
import styles from './ProductList.module.scss';

const ProductList: React.FC = observer(() => {


  const navigate = useNavigate();
  const { products, handleProductClick } = ProductStore;  
  

  return (
    <section className={styles['products__cards']}>
      {products.map((product) => (
        <div className={styles['products__column']} key={product.id}>
          <Card
            image={product.images[0]}
            title={product.title}
            subtitle={product.description}
            captionSlot={product.category.name}
            contentSlot={`$${product.price}`}
            actionSlot={<Button>Add to Cart</Button>}
            className={styles['products__card']}
            onClick={() => handleProductClick(product, navigate)}
          />
        </div>
      ))}
    </section>
  );
});

export default ProductList;
