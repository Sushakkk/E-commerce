
import { observer} from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
import styles from './PracticeSection.module.scss';
import ProductsStore from 'stores/ProductsStore';
import { useCallback } from 'react';
import { handleProductClick } from 'utils/navigationUtils';



interface ProductsProps {
    localProductsStore: ProductsStore;
  }

const PracticeSection: React.FC<ProductsProps> = observer(({localProductsStore}) => {

  const navigate = useNavigate();
  const productClickHandler = useCallback(handleProductClick(navigate), [navigate]);

  

  return (
    <section className={`${styles.page__practice} ${styles.practice}`}>
      <div className={`${styles.practice__container} ${styles._container}`}>
        <div className={`${styles.practice__header} ${styles['header-block']}`}>
          <h2 className={styles['header-block__title']}>Elegance and Functionality</h2>
          <div className={styles['header-block__sub-title']}>
          The perfect blend of elegant design and functionality.<br /> Our furniture is designed to highlight your individuality and make your home cozy and practical.
          </div>
        </div>
        <div className={styles.practice__body}>
          {localProductsStore.products.slice(0, 4).map((product) => (
            <div key={product.id}    onClick={() => productClickHandler(product)} className={styles.practice__column}>
              <article className={`${styles.practice__item} ${styles['item-practice']}`}>
                <div className={styles['item-practice__content']}>
                  <Link to="#" className={styles['item-practice__link']}>
                    <h4 className={styles['item-practice__title']}>{product.title}</h4>
                  </Link>
                  <div className={styles['item-practice__text']}>{product.description}</div>
                </div>
                <Link to="#" className={`${styles['item-practice__image']} ${styles._ibg}`}>
                  <img  src={product.images[0]} alt={product.title} />
                </Link>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default PracticeSection;
