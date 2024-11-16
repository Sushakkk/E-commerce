import React, { useState, useCallback } from 'react';
import styles from './ImageSlider.module.scss';
import PaginationIcon from 'components/PaginationIcon/PaginationIcon';
import { observer } from 'mobx-react-lite';
import ProductDetailStore from 'stores/ProductDetailsStore';


interface ImageSliderProps {
  ProductDetailsStore: ProductDetailStore;
}

const ImageSlider: React.FC<ImageSliderProps> = observer(({ ProductDetailsStore }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { product } = ProductDetailsStore;

  if (!product) {
    return <div>Загрузка...</div>;
  }

  console.log(product.images)

  const isFirstImage = currentImageIndex === 0;
  const isLastImage = currentImageIndex === product.images.length - 1;

  const handleNextImage = useCallback(() => {
    if (!isLastImage) {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
    }
  }, [isLastImage]);

  const handlePrevImage = useCallback(() => {
    if (!isFirstImage) {
      setCurrentImageIndex((prevIndex) => prevIndex - 1);
    }
  }, [isFirstImage]);

  return (
    <div className={styles.slider__container}>
      <button
        onClick={handlePrevImage}
        className={`${styles.slider__button} ${styles['slider__button-left']} ${isFirstImage ? styles['slider__button-disabled'] : ''}`}
        disabled={isFirstImage}
      >
        <PaginationIcon direction="left" strokeWidth="3" color="base" />
      </button>

      <img
        src={product.images[currentImageIndex]}
        alt={product.title}
        className={styles.slider__image}
      />

      <button
        onClick={handleNextImage}
        className={`${styles.slider__button} ${styles['slider__button-right']} ${isLastImage ? styles['slider__button-disabled'] : ''}`}
        disabled={isLastImage}
      >
        <PaginationIcon direction="right" strokeWidth="3" color="base" />
      </button>
    </div>
  );
});

export default React.memo(ImageSlider);
