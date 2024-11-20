import React, { useState, useCallback, useEffect } from 'react';
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

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [location]); 


  const toggleMenu = () => setIsMenuOpen((prev) => !prev);


  const closeMenu = () => setIsMenuOpen(false);


  const handleLogoClick = useCallback(() => {
    navigate('/', { replace: true });
  }, [navigate]);


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
              { name: 'Product', path: '/' },
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
