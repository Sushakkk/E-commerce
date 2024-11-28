import Button from 'components/Button/Button';
import styles from './AboutPage.module.scss';
import ImageCarousel from './components/ImageCarousel/ImageCarousel';
import { Link, useLocation } from 'react-router-dom';
import { useCallback,  useEffect,  useRef} from 'react';
import Loader from 'components/Loader';
import { observer, useLocalStore } from 'mobx-react-lite';
import { toast, ToastContainer } from 'react-toastify';
import ProductsStore from 'stores/ProductsStore';
import PracticeSection from './components/PracticeSection/PracticeSection';


const AboutPage = observer(() => {
  const location = useLocation();
  const { state } = location;

  const localProductsStore = useLocalStore(() => new ProductsStore());

 

  useEffect(() => {

 if (state?.message ) {
  if (state.message === "Logout") {
    toast.info('Logout', { position: 'top-right',  });
  } else {
    toast.success(state.message, { position: 'top-right', });
  }
}
    

  }, [state, localProductsStore.meta ]);




  const familyImages = [
    { src: 'https://avatars.mds.yandex.net/i?id=22968304af6a0670ae5ee025c1e32855_l-5575009-images-thumbs&n=13', alt: 'Training people 1' },
    { src: 'https://yandex-images.clstorage.net/9o74ivO15/c9876bbR/47JPeUb5j1kyuLI0EOyvm59OfyuHBulGcd5ucSHWIwGZhR0iYSNj2Got68vZhgdj3_xGcMnTGyJhRY5GdDr28AamCj2DfSsJAvgjEIEti6qfnqsbRmPNUzE7zccD4bE3fnO_kDOUEh0vzZ4PWDJGJWkIceHsxr3FFFa44gZqgyWzQI2oxLhcX6D7kWFTLpw5zQ8aWdeVj5ZWzIz10dMihD3iPeLwJnFcDb3MHdySN2X67CPjzLV9dcZF6QH3a2K1g0GNeuQITyxQWHFB4nzfyf4fWIkkVO3Vh19_l1Chw4T-sZ9CYaTDH788__29QSfHuAzQkq0Ef0cn9qmDlWgixJHjr_pUmy5fM_qSMNBd7Wudn6toVbWO9HS-bHahAAPWb4INsjIn4I2tTp6MLbAn1xn_4LK91140pebZomcakaRhcw1bFYku7ZBIghGxvO-bfDybC9ZHTsQmPVzkc8ETd-4zvRAABKIcvc7c_a2x9mS4nPNC3dc8d8XmG8IXOXI3ojG-CMS5re3CqiCDwBxceW3-uxg3dP40RI4cpjNikbSeYQ0TQiWjDj9v_g2tUCZ0uD7jk45kDLTF9_vhtOoCNbNDfRgWmy6NEQox8eDufAk9jOmKRzftBCdvfrex0iIkvuLNYAE0k9_vzL19XANXpvt-UgEslD03hpbJE2cZInSB80wJllpcvaJKgDJxzy8q3z6Ka0TWDJdmjIwV0bKgVx-grIAjFdPNrf0fD6xzFWfabNHw3KccdPfV6kIm-uBlIvGeCWS7nJ9CShOQsF-uKS4_utgF1x33hj7dFpKxMdTe0e5hIYRzfE_OTh_NsnZU-7wh0p40rxXVVSlQZfkjVlKTz1uEus1s4kqB0qEMnyifn3rp57TM5GcMrMQCUWCVrmKNM8CE4bw_nQ1tX_NEdDoe4BHup2_1Bzc6IGRa80ZAwh7ppDvevqFaQ-Bz7O_p_F2bSRfljuTGva6no4FQI', alt: 'Training people 2' },
    { src: 'https://avatars.dzeninfra.ru/get-zen_doc/10198457/pub_64da2a484e2a872cc46cec50_64e632e92203891207c526f8/scale_1200', alt: 'Training people 3' },
    { src: 'https://amazingfacts.ru/wp-content/uploads/2023/06/1-9.jpg', alt: 'Training people 4' }
  ];


  const familySectionRef = useRef<HTMLElement | null>(null);

  const scrollToFamilySection = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault(); 
      if (familySectionRef.current) {
        familySectionRef.current.scrollIntoView({
          behavior: 'smooth', 
        });
      }
    },
    [] 
  );

  if (localProductsStore.meta === 'loading') {
    return (
      <main className="page">
        <div className="page__loader">
        <ToastContainer />
          <Loader />
        </div>
      </main>
    );
  }
 

  return (
    <main id="main" className="page">
       <ToastContainer className='custom-toast' />
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

          <div className={styles.row}>
            <span>Tech</span>
            <span>Accessories</span>
            <span>Sports</span>
            <span>Toys</span>
            <span>Gifts</span>
            <span>Automotive</span>
          </div>

         
        </div>

        <div className={styles.container}>
          <div className={styles.hero}>
            <div className={styles.hero__tagline}>#AllYouNeed #EverythingInOnePlace</div>
            <div className={`${styles.hero__title} animate__animated animate__fadeInDown`}>
              <span>Lalasia</span>
            </div>
            <div className={styles.hero__subtitle}>
              Discover everything you need, all in one place.
            </div>
            <div  className={styles.hero__buttons}>
            <Link to='/products'><Button className={`${styles.hero__button}  wow animate__animated animate__fadeInLeftBig`}>Products</Button></Link>
            <Link  to="/categories"><Button className={`${styles.hero__button} wow  animate__animated animate__fadeInRightBig `}>Categories</Button></Link>
            </div>
          </div>
        </div>
    
        <div className={styles.scrollDown}>
          <button onClick={scrollToFamilySection} className={styles.arrow}></button>
        </div>
      </div>

      <section id="family-section" ref={familySectionRef} className={styles.family}>
          <header className={styles['family-header']}>
            <h2 className={`${styles['family-title']} ${styles['title-big']} ${styles['backdrop-title']} ${styles['centered']} `} data-title="Part">
              Be a part of our family
            </h2>
            <div className={styles['family-description']}>
              <p>Everything You Need, All in One Place.</p>
            </div>
          </header>
        <ImageCarousel images={familyImages} />
        </section>
        <PracticeSection  />
    </main>
  );
});

export default AboutPage;