// src/pages/ProductPage/ProductPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import Loader from 'components/Loader';
import RelatedProducts from './components/RelatedProducts';
import styles from './ProductPage.module.scss';
import ProductDetails from './components/ProductDetails/ProductDetails';
import ProductDetailsStore from 'stores/ProductDetailsStore/ProductDetailsStore';
import { useLocalStore } from 'hooks/useLocalStore';
import { observer } from 'mobx-react-lite';
import ImageSlider from './components/ImageSlider.tsx';
import BackButton from './../../components/BackButton/BackButton';


const ProductPage: React.FC = observer(() => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);



  const localProductDetailsStore = useLocalStore(() => new ProductDetailsStore());
  const { product, productMeta} = localProductDetailsStore;


  useEffect(() => {
    if (id) {
      Promise.all([
        localProductDetailsStore.fetchProduct(id),
        localProductDetailsStore.fetchRelatedProducts(id),
      ]);
    }
  }, [id]);

  if (productMeta==='loading' || isLoading) {
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
       <BackButton/>
        <div className={styles.product__content}>
          <div className={styles.product__wrapper}>
            <ImageSlider ProductDetailsStore={localProductDetailsStore} />
            <ProductDetails  ProductDetailsStore={localProductDetailsStore} setIsLoading={setIsLoading}/>
          </div>
          <RelatedProducts ProductDetailsStore={localProductDetailsStore}/>
        </div>
      </div>
    </main>
  );
});

export default ProductPage;
