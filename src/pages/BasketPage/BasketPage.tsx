import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import basketStore from 'stores/BasketStore/BasketStore';
import styles from './BasketPage.module.scss';
import AuthStore from 'stores/AuthStore';
import rootStore from 'stores/RootStore/instance';
import { decodeJWT } from 'utils/token';
import { useNavigate } from 'react-router-dom';


const BasketPage: React.FC = observer(() => {
  const { basketItems, totalPrice, totalItems } = basketStore;
  const navigate = useNavigate();

  const handleCompleteOrder = useCallback(async () => {
    const orderDetails = basketItems.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      totalPrice: totalPrice.toFixed(2),
    }));
  
    let userEmail = '';
  
    if (AuthStore.setUser()) {
      const token = rootStore.QueryStore.getQueryParam('auth');
      const decoded = decodeJWT(String(token));
      userEmail = decoded.payload.email;
    } else {
      navigate('/auth');
    }
  
    const orderSummary = `
      Order Confirmation:
      ----------------------
      Here are the details of your order:
      ${orderDetails.map(item => `${item.name} - ${item.quantity} x $${item.price} = $${item.totalPrice}`).join('\n')}
      
      Total Items: ${totalItems}
      Total Price: $${totalPrice.toFixed(2)}
  
      Thank you for shopping with us! We will process your order shortly.
    `;
  
    const formData = {
      name: "Customer",  // Имя пользователя
      email: userEmail,  // Email пользователя
      message: orderSummary,  // Сообщение с деталями заказа
      subject: "Order Confirmation - Thank you for your purchase!",  // Тема письма
      access_key: "57586578-4ef8-4215-86d2-44e2823a8b07",  // Ваш ключ Web3Forms
    };
  
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      }).then((res) => res.json());
  
      if (res.success) {
        console.log("Order sent successfully!", res);
      } else {
        console.error("Failed to send order:", res);
      }
    } catch (error) {
      console.error("Error sending order:", error);
    }
  }, [basketItems, totalPrice, totalItems]);
  

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
                    <img src={item.image} alt={item.name} className={styles.basketItemImage} />
                    <div className={styles.basketItemDetails}>
                      <h2 className={styles.basketItemName}>{item.name}</h2>
                      <p className={styles.basketItemPrice}>${item.price.toFixed(2)}</p>
                      <p className={styles.basketItemQuantity}>Quantity: {item.quantity}</p>
                    </div>
                    <button
                      className={styles.removeButton}
                      onClick={() => basketStore.removeFromBasket(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className={styles.basketSummary}>
                <h2>Order Summary</h2>
                <p>Total Items: {totalItems}</p>
                <p>Total Price: ${totalPrice.toFixed(2)}</p>
                <button className={styles.completeButton} onClick={handleCompleteOrder}>
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
