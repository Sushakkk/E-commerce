import React, { useState, useCallback } from 'react';
import styles from './ImageSlider.module.scss';
import PaginationIcon from 'components/PaginationIcon/PaginationIcon';
import { observer } from 'mobx-react-lite';
import ProductDetailStore from 'stores/ProductDetailsStore';
import useImageHandler from 'hooks/useImageHandler';

interface ImageSliderProps {
  ProductDetailsStore: ProductDetailStore;
}

const ImageSlider: React.FC<ImageSliderProps> = observer(({ ProductDetailsStore }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { product } = ProductDetailsStore;
  const { getImage } = useImageHandler();

  if (!product) {
    return <div>Загрузка...</div>;
  }

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

  // Если количество изображений = 1, не показывать кнопки навигации
  const showPagination = product.images.length > 1;

  return (
    <div className={styles.slider__container}>
      {showPagination && (
        <button
          onClick={handlePrevImage}
          className={`${styles.slider__button} ${styles['slider__button-left']} ${isFirstImage ? styles['slider__button-disabled'] : ''}`}
          disabled={isFirstImage}
        >
          <PaginationIcon direction="left" strokeWidth="3" color="base" />
        </button>
      )}

      <img
        src={getImage(product.images[currentImageIndex])}
        alt={product.title}
        className={styles.slider__image}
      />

      {showPagination && (
        <button
          onClick={handleNextImage}
          className={`${styles.slider__button} ${styles['slider__button-right']} ${isLastImage ? styles['slider__button-disabled'] : ''}`}
          disabled={isLastImage}
        >
          <PaginationIcon direction="right" strokeWidth="3" color="base" />
        </button>
      )}
    </div>
  );
});

export default React.memo(ImageSlider);
