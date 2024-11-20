import React, { useEffect, useState } from 'react';
import styles from './ScrollToTop.module.scss'; // Импорт стилей

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Функция для отслеживания прокрутки
  const handleScroll = () => {
    if (window.scrollY > 200) { // Показываем стрелку, если прокрутка больше 200px
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Функция для прокрутки страницы в верх
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Подключаем слушатель события прокрутки
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`${styles.arrowUp} ${isVisible ? styles.arrowUpVisible : ''}`} // Применяем стили
      onClick={scrollToTop}
    >
      ↑
    </div>
  );
};

export default ScrollToTop;
