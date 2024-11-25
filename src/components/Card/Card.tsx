import React from 'react';
import styles from './Card.module.scss';
import Text from '../Text/Text';
import rootStore from 'stores/RootStore/instance';



export type CardProps = {
  className?: string;
  image: string;
  captionSlot?: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  contentSlot?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  actionSlot?: React.ReactNode;
  product?: { id: string; name: string; price: number; image: string }; 
};

const Card: React.FC<CardProps> = ({
  className = '',
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
  product,
}) => {
  // Функция для добавления в корзину
  const handleAddToCart = () => {
    if(product){
      rootStore.BasketStore.addToBasket(product);
    }
  };

  return (
    <div className={`${styles.card} ${className}`}>
      <img
        src={image}
        alt="card-image"
        className={styles.card__image}
        onClick={onClick}
      />

      <div className={styles.card__content}>
        <div className={styles.card__body} onClick={onClick}>
          {captionSlot && (
            <Text tag="p" color="secondary" view="p-14">
              {captionSlot}
            </Text>
          )}
          {title && (
            <Text
              tag="p"
              data-testid="text"
              className={styles.card__title}
              weight="bold"
              view="p-20"
            >
              {title}
            </Text>
          )}
          {subtitle && (
            <Text
              tag="p"
              data-testid="text"
              className={styles.card__subtitle}
              color="secondary"
              view="p-16"
            >
              {subtitle}
            </Text>
          )}
        </div>

        <div className={styles.card__button}>
          {contentSlot && (
            <Text tag="p" weight="bold" view="p-18">
              {contentSlot}
            </Text>
          )}
          {actionSlot && (
            <div
              className={styles.card__button_addToCart}
              onClick={handleAddToCart}
            >
              {actionSlot}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
