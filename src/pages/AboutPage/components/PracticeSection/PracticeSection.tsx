import { observer } from 'mobx-react-lite';
import styles from './PracticeSection.module.scss';

import useImageHandler from 'hooks/useImageHandler';

const furnitureProducts = [
  {
    id: 1,
    title: "Luxury Sofa",
    description: "Experience ultimate comfort with our luxury sofa, designed to add a touch of elegance to your living room.",
    imageUrl: "https://www.comfyco.com/pics3/fit/m/mo1633a.jpg",
  },
  {
    id: 2,
    title: "Modern Dining Table",
    description: "Our modern dining table is perfect for family gatherings and dinner parties. Its sleek design fits any decor.",
    imageUrl: "https://lalume.ru/image/cache/catalog/i/me/cl/1580495d6065d685eefa28e6521683e1-1440x1440.webp",
  },
  {
    id: 3,
    title: "Stylish Bed Frame",
    description: "Sleep in style with our stylish bed frame, offering both comfort and a contemporary look.",
    imageUrl: "https://m.media-amazon.com/images/I/818lx6SakML.jpg",
  },
  {
    id: 4,
    title: "Classic Armchair",
    description: "Add a classic touch to your reading nook with our comfortable and timeless armchair.",
    imageUrl: "https://mebel-lugansk.shop/wp-content/uploads/2022/12/kresla.jpg",
  }
];

const PracticeSection = observer(() => {

  const { getImage } = useImageHandler();



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
          {furnitureProducts.map((product, index) => (
            <div
              key={product.id}
              className={`${styles.practice__column} wow animate__animated 
                ${index === 0 || index === 1 ? 'animate__fadeInLeft' : 'animate__fadeInRight'}`}
            >
              <article className={`${styles.practice__item} ${styles['item-practice']}`}>
                <div className={styles['item-practice__content']}>
                  <div  className={styles['item-practice__link']}>
                    <h4 className={styles['item-practice__title']}>{product.title}</h4>
                  </div>
                  <div className={styles['item-practice__text']}>{product.description}</div>
                </div>
                <div className={`${styles['item-practice__image']} ${styles._ibg}`}>
                  <img src={getImage(product.imageUrl)} alt={product.title} />
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default PracticeSection;
