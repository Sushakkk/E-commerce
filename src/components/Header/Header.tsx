import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import Logo from '../Logo/Logo';
import Text from '../Text/Text';
import Basket from '../Basket/Basket';
import User from '../User/User';

const Header: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('Product');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  // Переключение состояния меню
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Закрытие меню
  const closeMenu = () => setIsMenuOpen(false);

  // Обработчик для логотипа
  const handleLogoClick = useCallback(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  // Обработчик клика по пункту меню
  const handleItemClick = (item: string) => {
    setActiveItem(item);
    closeMenu(); // Закрываем меню после выбора пункта
  };

  return (
    <header className={`${styles.header} ${isMenuOpen ? styles.lock : ''}`}>
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <Link to="#" onClick={handleLogoClick}>
            <Logo />
          </Link>
        </div>

    
       

        <nav className={`${styles.header__menu} ${isMenuOpen ? styles.active : ''}`}>
          <ul className={styles.menu__list}>
            {['Product', 'Categories', 'About us'].map((item) => (
              <li
                key={item}
                className={`${styles.menu__item} ${activeItem === item ? styles.active : ''}`}
                onClick={() => handleItemClick(item)}
              >
                <Text tag="p" view="p-18" weight={activeItem === item ? '600' : undefined}>
                  {item}
                </Text>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles['header__burger-container']}>
        <div className={styles.header__icons}>
          <Basket />
          <User />
        </div>

        <div
          className={`${styles.header__burger} ${isMenuOpen ? styles.active : ''}`}
          onClick={toggleMenu}
        >
          <span></span>
        </div>
        
      </div>
        </div>
    </header>
  );
};

export default Header;
