import React, { useCallback, useState } from 'react';
import Text from 'components/Text/Text';
import Button from 'components/Button';
import styles from './ProductDetails.module.scss';
import { observer } from 'mobx-react-lite';
import ProductDetailStore from 'stores/ProductDetailsStore';
import emailjs from '@emailjs/browser';
import { decodeJWT } from 'utils/token';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import rootStore from 'stores/RootStore/instance';

interface ProductDetailsProps {
  ProductDetailsStore: ProductDetailStore;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductDetails: React.FC<ProductDetailsProps> = observer(({ ProductDetailsStore, setIsLoading }) => {
  const { product } = ProductDetailsStore;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate= useNavigate()

  const handleBuyNow = useCallback(async () => {
    if (!product) return;

    setIsLoading(true);

    const orderDetails = {
      name: product.title,
      price: product.price.toFixed(2),
      quantity: 1,
      image: product.images[0],
      totalPrice: product.price.toFixed(2),
    };

    const orderSummary = `${orderDetails.name} - ${orderDetails.quantity} x $${orderDetails.price} = $${orderDetails.totalPrice}`;

    let userEmail = '';
    const token = rootStore.QueryStore.getQueryParam('auth');

    let name='Customer'
    if (rootStore.AuthStore.user) {
      if(rootStore.AuthStore.user.fio){
        name=rootStore.AuthStore.user.fio;
      }
    }
  

    try {
      if (token) {
        
        const decoded = decodeJWT(String(token));
        userEmail = decoded.payload.email;
      } else {

        toast.error('Please sign in to complete your order.');
        navigate('/auth');
        return;
      }

      const templateParams = {
        email: userEmail,
        to_name: name,
        from_name: 'Lalasia Store',
        totalItems: 1,
        totalPrice: orderDetails.totalPrice,
        items: [orderDetails],
        message: `
          Order Details:
          ${orderSummary}
        `,
      };

      const response = await emailjs.send(
        'service_wb0e44f',
        'template_nohzq8l',
        templateParams,
        '8FzihwMy8PxMrMmKe'
      );

      if (response.status === 200) {
        toast.success("Order successfully completed! 🎉");
        toast.success("Check your email.");
        if (rootStore.AuthStore.user) {
          if (rootStore.AuthStore.user.orderCount === undefined) {
            rootStore.AuthStore.user.orderCount = 1;
          } else {
            rootStore.AuthStore.user.orderCount += 1;
          }
        }
        
      } else {
        toast.error("Failed to send order email. Please try again.");
      }
    } catch (error) {
      console.error("Error completing order:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      setIsModalOpen(false); 
    }
  }, [product]);

  const handleCancelOrder = () => {
    setIsModalOpen(false); 
  };

  const handleAddToCart = useCallback(() => {
    if (product) {
      rootStore.BasketStore.addToBasket({
        id: product.id.toString(),
        name: product.title,
        price: product.price,
        image: product.images[0],
      });
    }
  }, [product]);

  if (!product) {
    return <div>Товар не найден</div>;
  }



  return (
    <div className={styles['product__text-container']}>
      <ToastContainer className='custom-toast' position="top-right" autoClose={5000} hideProgressBar={false} />

      <div className={styles.product__text_title}>
        <Text view="title" weight="bold">
          {product.title}
        </Text>
        <Text view="p-20" color="secondary">
          {product.description}
        </Text>
      </div>
      <div className={styles.product__price}>
        <Text view="title" className="page-title-price" weight="bold">
          ${product.price}
        </Text>
        <div className={styles.product__buttons}>
          <Button
            className={styles['buy-now-button']}
            onClick={() => setIsModalOpen(true)} // Открытие модального окна
          >
            Buy Now
          </Button>
          <Button
            className={styles['add-to-cart-button']}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Модальное окно с эффектами и анимациями */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <p className={styles.modalTitle}>Are you sure you want to complete your order?</p>
            <div className={styles.modalButtons}>
              <Button className={styles.confirmButton} onClick={handleBuyNow}>
                <div className={styles.icon} /> Yes
              </Button>
              <Button className={styles.cancelButton} onClick={handleCancelOrder}>
                <div className={styles.icon} /> No
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default ProductDetails;