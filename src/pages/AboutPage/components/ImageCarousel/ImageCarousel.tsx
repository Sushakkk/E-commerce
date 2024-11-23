import React, { useEffect, useRef } from 'react';
import styles from './ImageCarousel.module.scss';

interface ImageCarouselProps {
  images: { src: string; alt: string }[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;

    if (slider) {
      // Дублируем изображения для бесшовной анимации
      slider.innerHTML += slider.innerHTML;

      // Рассчитываем ширину одного полного цикла
      const sliderWidth = slider.scrollWidth / 2;

      let animationFrameId: number;
      let position = 0;

      const animate = () => {
        position -= 1; // Скорость прокрутки (измените при необходимости)
        if (Math.abs(position) >= sliderWidth) {
          position = 0; // Сбрасываем позицию для бесшовности
        }
        slider.style.transform = `translateX(${position}px)`;

        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      // Очистка анимации при размонтировании компонента
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, []);

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.slider} ref={sliderRef}>
        {images.map((image, index) => (
          <img key={index} src={image.src} alt={image.alt} className={styles.carouselImage} />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
