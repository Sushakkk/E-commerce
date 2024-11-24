import React from 'react';
import { observer } from 'mobx-react-lite';
import basketStore from 'stores/BasketStore/BasketStore';
import styles from './BasketPage.module.scss';

const BasketPage: React.FC = observer(() => {
  const { basketItems, totalPrice, totalItems } = basketStore;

  return (
    <main id="main" className="page">
      <div className={styles['page__main-block']}>
        <div className={styles.basketContainer}>
        <h1 className={styles.basketTitle}>Your Cart</h1>

{basketItems.length === 0 ? (
  <p className={styles.emptyBasket}>Your cart is empty.</p>
) : (
  <div className={styles.basketContent}>
    <div className={styles.basketItems}>
      {basketItems.map((item) => (
        <div className={styles.basketItem} key={item.id}>
          {/* Изображение товара */}
          <img 
            src={item.image} 
            alt={item.name} 
            className={styles.basketItemImage} 
          />

          {/* Информация о товаре */}
          <div className={styles.basketItemDetails}>
            <h2 className={styles.basketItemName}>{item.name}</h2>
            <p className={styles.basketItemPrice}>${item.price.toFixed(2)}</p>
            <p className={styles.basketItemQuantity}>
              Quantity: {item.quantity}
            </p>
          </div>

          {/* Кнопка удаления */}
          <button
            className={styles.removeButton}
            onClick={() => basketStore.removeFromBasket(item.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>

    {/* Итоговая информация */}
    <div className={styles.basketSummary}>
      <h2>Order Summary</h2>
      <p>Total Items: {totalItems}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
      <button className={styles.completeButton} >
            Complete Order
      </button>
    </div>
  </div>
)}
        </div>
      </div>
    </main>
  );
});

export default BasketPage;
