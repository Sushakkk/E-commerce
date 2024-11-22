
import styles from './AboutPage.module.scss';

const AboutPage = () => {
  return (
    <main id="main" className="page">
    <div className={styles.abut__container}>
      <div className={styles.wall}>
      <div className={styles.row}>
            <span>Clothing</span>
            <span>Electronics</span>
            <span>Shoes</span>
            <span>Furniture</span>
            <span>Jewelry</span>
            <span>Decor</span>
            <span>Cosmetics</span>
            <span>Books</span>
            <span>Gadgets</span>
          </div>
          
          <div className={styles.row}>
            <span>Tech</span>
            <span>Accessories</span>
            <span>Sports</span>
            <span>Toys</span>
            <span>Gifts</span>
            <span>Automotive</span>
          </div>
          <div className={styles.row}>
            <span>Clothing</span>
            <span>Electronics</span>
            <span>Shoes</span>
            <span>Furniture</span>
            <span>Jewelry</span>
            <span>Decor</span>
            <span>Cosmetics</span>
            <span>Books</span>
            <span>Gadgets</span>
          </div>
          
          
          
      </div>

      <div className={styles.container}>
        <div className={styles.hero}>
        <div className={styles.hero__tagline}>#AllYouNeed #EverythingInOnePlace</div>
            <div className={styles.hero__title}>
              <span>Lasia</span>
            </div>
            <div className={styles.hero__subtitle}>
              Discover everything you need, all in one place.
            </div>
        </div>
      </div>
      </div>
    </main>
  );
};

export default AboutPage;
