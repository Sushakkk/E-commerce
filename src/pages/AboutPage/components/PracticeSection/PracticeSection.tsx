
import { observer} from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import styles from './PracticeSection.module.scss';
import ProductsStore from 'stores/ProductsStore';



interface ProductsProps {
    localProductsStore: ProductsStore;
  }

const PracticeSection: React.FC<ProductsProps> = observer(({localProductsStore}) => {

  

  return (
    <section className={`${styles.page__practice} ${styles.practice}`}>
      <div className={`${styles.practice__container} ${styles._container}`}>
        <div className={`${styles.practice__header} ${styles['header-block']}`}>
          <h2 className={styles['header-block__title']}>Top Electronics for Every Need</h2>
          <div className={styles['header-block__sub-title']}>
          Find the latest gadgets and devices for your home and lifestyle. <br /> Shop now for unbeatable quality and prices.
          </div>
        </div>
        <div className={styles.practice__body}>
          {localProductsStore.products.slice(0, 4).map((product) => (
            <div key={product.id} className={styles.practice__column}>
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
