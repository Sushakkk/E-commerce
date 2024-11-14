// src/pages/ProductPage/ProductPage.tsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Loader from 'components/Loader';
import PaginationIcon from 'components/PaginationIcon/PaginationIcon';
import Text from 'components/Text/Text';
import RelatedProducts from './components/RelatedProducts';
import styles from './ProductPage.module.scss';
import ImageSlider from './components/ImageSlider.tsx';
import ProductDetails from './components/ProductDetails/ProductDetails.tsx';
import ProductDetailsStore from 'stores/ProductDetailsStore/ProductDetailsStore.ts';


const ProductPage: React.FC = observer(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, productMeta} = ProductDetailsStore;


  useEffect(() => {
    if (id) {
      Promise.all([
        ProductDetailsStore.fetchProduct(id),
        ProductDetailsStore.fetchRelatedProducts(id),
      ]);
    }
  }, [id]);

  if (productMeta==='loading') {
    return (
      <main className="page">
        <div className="page__loader">
          <Loader />
        </div>
      </main>
    );
  }

  

  if (!product) return <div>Товар не найден</div>;

  return (
    <main className="page">
      <div className={styles.page__product}>
        <div className={styles['product__button-container']}>
          <div className={styles.product__button_back} onClick={() => navigate('/')}>
            <PaginationIcon />
            <Text view="p-20">Назад</Text>
          </div>
        </div>

        <div className={styles.product__content}>
          <div className={styles.product__wrapper}>
            <ImageSlider />
            <ProductDetails  />
          </div>
          <RelatedProducts />
        </div>
      </div>
    </main>
  );
});

export default ProductPage;
