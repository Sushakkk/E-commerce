import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import Logo from 'components/Logo/Logo';

import Instagram from './components/social/Instagram/Instagram';
import Twitter from './components/social/Twitter/Twitter';
import Youtube from './components/social/Youtube/Youtube';
import Facebook from './components/social/Facebook';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__top}>
        <div className={styles.footer__main}>
          <div className={styles.footer__row}>
            <div className={`${styles.header__logo} ${styles.footer_logo}`}>
              <Logo/>
            </div>
            <nav className={styles.menu__footer}>
              <ul className={styles.menu__footer__list}>
                <li className={styles.menu__footer__item}>
                  <Link to="#main" className={styles.menu__footer__link}>Главная</Link>
                </li>
                <li className={styles.menu__footer__item}>
                  <Link to="#about" className={styles.menu__footer__link}>О компании</Link>
                </li>
                <li className={styles.menu__footer__item}>
                  <Link to="#services" className={styles.menu__footer__link}>Услуги</Link>
                </li>
                <li className={styles.menu__footer__item}>
                  <Link to="#contacts" className={styles.menu__footer__link}>Контакты</Link>
                </li>
              </ul>
            </nav>
            <div className={styles.footer__column}>
              <div className={styles.contacts__footer}>
                <Link to="tel:4805550103" className={`${styles.contacts__footer__item} ${styles.contacts__footer__item__phone}`}>
                  (480) 555-0103
                </Link>
                <Link to="#" className={`${styles.contacts__footer__item} ${styles.contacts__footer__item__map}`}>
                  4517 Washington Ave. Manchester, Kentucky 39495
                </Link>
                <Link to="mailto:debra.holt@example.com" className={`${styles.contacts__footer__item} ${styles.contacts__footer__item__email}`}>
                  debra.holt@example.com
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer__bottom}>
        <div className={styles.footer__container}>
          <div className="t420__text t-descr t-descr_xxs" >© 2024 - Lalasia</div>
          <div className={styles.footer__social}>
            <Link to="#" className={styles.social__item}>
              <Facebook/>
            </Link>
            <Link to="#" className={styles.social__item}>
              <Instagram/>
            </Link>
            <Link to="#" className={styles.social__item}>
              <Twitter/>
            </Link>
            <Link to="#" className={styles.social__item}>
              <Youtube/>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
