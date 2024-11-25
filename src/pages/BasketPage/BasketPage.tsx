import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import basketStore from 'stores/BasketStore/BasketStore';
import styles from './BasketPage.module.scss';
import emailjs from '@emailjs/browser';
import AuthStore from 'stores/AuthStore';

import { decodeJWT } from 'utils/token';
import { useNavigate } from 'react-router-dom';
import Loader from 'components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BasketStore from 'stores/BasketStore/BasketStore';
import rootStore from 'stores/RootStore/instance';


const BasketPage: React.FC = observer(() => {
  const { basketItems, totalPrice, totalItems } = rootStore.BasketStore;
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  const notifyError = (message: string) => 
  toast.error(message, { 
    position: 'top-right', 
    className: `${styles['custom-toast']}`, 
  });

const handleCompleteOrder = useCallback(async () => {
  setIsLoading(true);
  const orderDetails = basketItems.map((item) => ({
    name: item.name,
    price: item.price.toFixed(2),
    quantity: item.quantity ?? 1, 
    image: item.image,
    totalPrice: (item.price * (item.quantity ?? 1)).toFixed(2),
  }
));
  

  const orderSummary = orderDetails
    .map(
      (item) =>
        ` ${item.name} - ${item.quantity} x $${item.price} = $${item.totalPrice}`
    )
    .join('\n\n');


    let userEmail = '';
    const token = rootStore.QueryStore.getQueryParam('auth');
  
    if (token) {
      const token = rootStore.QueryStore.getQueryParam('auth');
      const decoded = decodeJWT(String(token));
      userEmail = decoded.payload.email;
    } else {
      navigate('/auth');
    }


  const templateParams = {
    email: userEmail,
    to_name: 'Customer', 
    from_name: 'Lalasia Store', 
    totalItems: totalItems,
    totalPrice:totalPrice.toFixed(2),
    items: orderDetails,
    message: `
      Order Details:
      ${orderSummary}
    `,
  };

  try {
    const response = await emailjs.send(
      'service_wb0e44f',
      'template_nohzq8l',
      templateParams,
      '8FzihwMy8PxMrMmKe' 
    );

    if (response.status === 200) {
      rootStore.BasketStore.clearBasket();
      rootStore.BasketStore.saveBasketToLocalStorage();
      toast.success("Order successfully Complete! 🎉");
      toast.success("Check your E-mail");
    } else {

      notifyError('Failed to send order email. Please try again.');
    }
  } catch (error) {

    notifyError('Sign up or log in to your account!');
  } finally {
    setIsLoading(false);
  }
}, [basketItems, totalPrice, totalItems]);

if (isLoading) {
  return (
    <main className="page">
      <div className="page__loader">
        <Loader /> 
      </div>
    </main>
  );
}


  return (
    <main id="main" className="page">
      <div className={styles['page__main-block']}>
      <ToastContainer /> 
        <div className={styles.basketContainer}>
          <h1 className={styles.basketTitle}>Your Cart</h1>

          {basketItems.length === 0 ? (
            <p className={styles.emptyBasket}>Your cart is empty.</p>
          ) : (
            <div className={styles.basketContent}>
              <div className={styles.basketItems}>
                {basketItems.map((item) => (
                  <div className={styles.basketItem} key={item.id}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className={styles.basketItemImage}
                    />
                    <div className={styles.basketItemDetails}>
                      <h2 className={styles.basketItemName}>{item.name}</h2>
                      <p className={styles.basketItemPrice}>
                        ${item.price.toFixed(2)}
                      </p>
                      <div className={styles.basketItemQuantity}>
                        <span>Quantity:</span>
                        <button
                          className={styles.quantityButton}
                          onClick={() =>  rootStore.BasketStore.decrementQuantity(item.id)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className={styles.quantityButton}
                          onClick={() =>  rootStore.BasketStore.incrementQuantity(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      className={styles.removeButton}
                      onClick={() =>  rootStore.BasketStore.removeFromBasket(item.id)}
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
                <button
                  className={styles.completeButton}
                  onClick={handleCompleteOrder}  // Trigger email sending on click
                >
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