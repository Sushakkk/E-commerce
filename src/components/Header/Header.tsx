import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import Logo from '../Logo/Logo';
import Text from '../Text/Text';
import Basket from '../Basket/Basket';
import User from '../User/User';

const Header: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('Product');

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.header__container} _container`}>
        <div className={styles.header__logo}>
          <Link to="/"> 
            <Logo />
          </Link>
        </div>

        <nav className={styles.header__menu}>
            <ul className={styles.menu__list}>
                <li
                    className={`${styles.menu__item} ${activeItem === 'Product' ? styles.active : ''}`}
                    onClick={() => handleItemClick('Product')}
                >
                    <Text tag="p" view="p-18" weight={activeItem === 'Product' ? '600' : undefined}>
                        Product
                    </Text>
                </li>
                <li
                    className={`${styles.menu__item} ${activeItem === 'Categories' ? styles.active : ''}`}
                    onClick={() => handleItemClick('Categories')}
                >
                    <Text tag="p" view="p-18" weight={activeItem === 'Categories' ? '600' : undefined}>
                        Categories
                    </Text>
                </li>
                <li
                    className={`${styles.menu__item} ${activeItem === 'About us' ? styles.active : ''}`}
                    onClick={() => handleItemClick('About us')}
                >
                    <Text tag="p" view="p-18" weight={activeItem === 'About us' ? '600' : undefined}>
                        About us
                    </Text>
                </li>
            </ul>
        </nav>

        <div className={styles.header__icons}>
          <Basket />
          <User />
        </div>
      </div>
    </header>
  );
};

export default Header;
