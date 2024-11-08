import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PaginationIcon from 'components/PaginationIcon/PaginationIcon';
import Text from 'components/Text/Text';
import Card from 'components/Card';
import styles from './ProductPage.module.scss'; 
import { ProductI } from 'pages/HomePage/HomePage';
import Button from 'components/Button';
import { handleCardClick } from 'utils/navigationUtils';
import Loader from 'components/Loader'; // Импортируем Loader
import '../../styles/styles.scss'

const ProductPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { product } = location.state || {};
    const [allProducts, setAllProducts] = useState<ProductI[]>([]);
    const [relatedProducts, setRelatedProducts] = useState<ProductI[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loading, setLoading] = useState<boolean>(true); // Состояние для загрузки

    const isFirstImage = currentImageIndex === 0;
    const isLastImage = currentImageIndex === product.images.length - 1;

    // Загружаем все продукты при монтировании компонента
    useEffect(() => {
        const fetchAllProducts = async () => {
            setLoading(true); // Устанавливаем загрузку в true
            try {
                const response = await axios.get('https://api.escuelajs.co/api/v1/products');
                setAllProducts(response.data);
            } catch (error) {
                console.error("Ошибка загрузки продуктов:", error);
            } finally {
                setLoading(false); // Устанавливаем загрузку в false после завершения запроса
            }
        };

        fetchAllProducts();
    }, []);

    // Выборка трех случайных продуктов из первых 7 позиций той же категории
    useEffect(() => {
        if (allProducts.length > 0) {
            const sameCategoryProducts = allProducts
                .filter((p) => p.category.name === product.category.name && p.id !== product.id)
                .slice(0, 7);

            const selectedProducts = sameCategoryProducts
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);

            if (selectedProducts.length < 3) {
                const additionalProducts = allProducts
                    .filter((p) => !selectedProducts.some((sp) => sp.id === p.id) && p.id !== product.id)
                    .slice(0, 7)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3 - selectedProducts.length);

                setRelatedProducts([...selectedProducts, ...additionalProducts]);
            } else {
                setRelatedProducts(selectedProducts);
            }
        }
    }, [allProducts, product]);

    const handleNextImage = () => {
        if (!isLastImage) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const handlePrevImage = () => {
        if (!isFirstImage) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    if (loading) return ( // Проверяем состояние загрузки
        <main className="page">
            <div className='page__loader _container'>
                <Loader /> 
            </div>
        </main>
    );

    return (
        <main id="main" className="page">
            <div className={`${styles.page__product} _container`}>
                <div className={styles['product__button-container']}>
                    <div className={styles.product__button_back} onClick={() => navigate('/')}>
                        <PaginationIcon />
                        <Text view="p-20">Назад</Text>
                    </div>
                </div>

                <div className={styles.product__content}>
                    <div className={styles.product__wrapper}>
                        <div className={styles["product__image-slider"]}>
                            <button
                                onClick={handlePrevImage}
                                className={`${styles['product__slider-button']}  ${styles['slider-button-left']}  ${isFirstImage ? styles['product__slider-button-disabled'] : ''}`}
                                disabled={isFirstImage}
                            >
                                <PaginationIcon direction="left" strokeWidth='3' color="base" />
                            </button>

                            <img
                                src={product.images[currentImageIndex]}
                                alt={product.title}
                                className={styles.product__image}
                                style={{ width: '50%', maxWidth: '400px' }}
                            />

                            <button
                                onClick={handleNextImage}
                                className={`${styles['product__slider-button']}   ${styles['slider-button-right']} ${isLastImage ? styles['product__slider-button-disabled'] : ''}`}
                                disabled={isLastImage}
                            >
                                <PaginationIcon direction="right" strokeWidth='3' color="base" />
                            </button>
                        </div>

                        <div className={styles['product__text-container']}>
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
                                    <Button width="135px" className={styles["buy-now-button"]}>Buy Now</Button>
                                    <Button className={styles["add-to-cart-button"]}>Add to Cart</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles['product__related-cards']}>
                        <Text view="p-32" className={styles.product__title} weight="bold">
                            Related Items
                        </Text>
                        <div className={`${styles.related_products} _cards`}>
                            {relatedProducts.map((relatedProduct: ProductI) => (
                                <Card
                                    key={relatedProduct.id}
                                    image={relatedProduct.images[0]}
                                    title={relatedProduct.title}
                                    subtitle={relatedProduct.description}
                                    captionSlot={relatedProduct.category.name}
                                    contentSlot={`$${relatedProduct.price}`}
                                    actionSlot={<Button>Add to Cart</Button>}
                                    className={styles.related_product_card}
                                    onClick={() => handleCardClick(relatedProduct, allProducts, navigate)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductPage;
