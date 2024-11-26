import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import Logo from 'components/Logo/Logo';

import Instagram from './components/social/Instagram/Instagram';
import WhatsApp from './components/social/WhatsApp/WhatsApp';
import Telegram from './components/social/Telegram';
import VkIcon from './components/social/vk/vk';
import Modal from './components/Modal/Modal';

interface SocialMediaInfo {
  name: string;
  description: string;
  link: string;
}

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accountInfo, setAccountInfo] = useState<SocialMediaInfo>({
    name: '',
    description: '',
    link: ''
  });

  const socialMediaInfo: { [key: string]: SocialMediaInfo } = {
    instagram: {
      name: 'Instagram',
      description: 'Следите за нами в Instagram для получения последних новостей.',
      link: 'https://www.instagram.com'
    },
    telegram: {
      name: 'Telegram',
      description: 'Присоединяйтесь к нашему каналу в Telegram.',
      link: 'https://t.me/sushakk'
    },
    whatsapp: {
      name: 'WhatsApp',
      description: 'Напишите нам в WhatsApp.',
      link: 'https://wa.me/79774201895'
    },
    vk: {
      name: 'VK',
      description: 'Следите за нами в VK.',
      link: 'https://vk.com/sushaaakkk'
    }
  };

 
  const openModal = useCallback((socialMedia: keyof typeof socialMediaInfo) => {
    setAccountInfo(socialMediaInfo[socialMedia]);
    setIsModalOpen(true);
  }, [socialMediaInfo]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const address = "4517 Washington Ave, Manchester, Kentucky 39495";  

  const handleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); 
    const yandexMapsUrl = `https://yandex.ru/maps/?text=${encodeURIComponent(address)}`;
    window.open(yandexMapsUrl, '_blank'); 
  }, [address]);


  return (
    <footer className={styles.footer}>
      <div className={styles.footer__top}>
        <div className={styles.footer__main}>
          <div className={styles.footer__row}>
            <div className={`${styles.header__logo} ${styles.footer_logo}`}>
              <Logo />
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
                <Link to="tel:+79774201895" className={`${styles.contacts__footer__item} ${styles.contacts__footer__item__phone}`}>
                  +7 (977) 420-1895
                </Link>
                <Link
        to="#"
        onClick={handleLinkClick}
        className={`${styles.contacts__footer__item} ${styles.contacts__footer__item__map}`}
      >
        {address}
      </Link>
                <Link to="mailto:kkkeyesmakeup@mail.ru" className={`${styles.contacts__footer__item} ${styles.contacts__footer__item__email}`}>
                  kkkeyesmakeup@mail.ru
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
            <div className={styles.social__item} onClick={() => openModal('instagram')}>
              <Instagram />
            </div>
            <div className={styles.social__item} onClick={() => openModal('telegram')}>
              <Telegram />
            </div>
            <div className={styles.social__item} onClick={() => openModal('whatsapp')}>
              <WhatsApp />
            </div>
            <div className={styles.social__item} onClick={() => openModal('vk')}>
              <VkIcon />
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} accountInfo={accountInfo} />
    </footer>
  );
};

export default Footer;
