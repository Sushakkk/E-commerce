import React, { useState, useCallback, useEffect } from 'react';
import { Link,  useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import Logo from '../Logo/Logo';
import Text from '../Text/Text';
import Basket from '../Basket/Basket';
import User from '../User/User';
import rootStore from 'stores/RootStore';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const location = useLocation();

  const getActiveItem = useCallback(() => {
    const path = location.pathname;
  
    if (path.startsWith('/category') || path === '/categories') {
      return 'Categories'; 
    } else if (path === '/about') {
      return 'About us';
    } else {
      return 'Products'; 
    }
  }, [location.pathname]);
  

  const [activeItem, setActiveItem] = useState<string>(getActiveItem);

  useEffect(() => {
    setActiveItem(getActiveItem());
    window.scrollTo(0, 0);
  }, [location, getActiveItem]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogoClick = useCallback(() => {
    rootStore.QueryStore.resetQueryParams();
  }, []);

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    closeMenu();
  };

  return (
    <header className={`${styles.header} ${isMenuOpen ? styles.lock : ''}`}>
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <Link to="/" onClick={handleLogoClick}>
            <Logo />
          </Link>
        </div>

        <nav className={`${styles.header__menu} ${isMenuOpen ? styles.active : ''}`}>
          <ul className={styles.menu__list}>
            {[
              { name: 'Products', path: '/' },
              { name: 'Categories', path: '/categories' },
              { name: 'About us', path: '/about' },
            ].map(({ name, path }) => (
              <li
                key={name}
                className={`${styles.menu__item} ${activeItem === name ? styles.active : ''}`}
                onClick={() => handleItemClick(name)}
              >
                <Link to={path}>
                  <Text tag="p" view="p-18" weight={activeItem === name ? '600' : undefined}>
                    {name}
                  </Text>
                </Link>
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
