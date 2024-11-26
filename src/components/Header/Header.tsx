import React, { useState, useCallback, useEffect } from 'react';
import { Link,  useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import Logo from '../Logo/Logo';
import Text from '../Text/Text';
import Basket from '../Basket/Basket';
import User from '../User/User';
import { observer} from 'mobx-react-lite';
import 'react-toastify/dist/ReactToastify.css';
import rootStore from 'stores/RootStore/instance';

const Header: React.FC = observer(() => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate(); 

  const getActiveItem = useCallback(() => {
    const path = location.pathname;
  
    if (path.startsWith('/category') || path === '/categories') {
      return 'Categories'; 
    } else if (path === '/products') {
      return 'Products';
    } else if (path === '/') {
      return 'About us'; 
    }
    else
    {
      return '';
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
    rootStore.QueryStore. deleteQueryParam('page')
    rootStore.QueryStore. deleteQueryParam('search')
    rootStore.QueryStore. deleteQueryParam('category')
  }, []);

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    closeMenu();
  };


  const localAuthStore= rootStore.AuthStore;


  const handleLogout = () => {
    localAuthStore.logout();
    closeMenu();
    navigate('/', { state: { message: 'Logout' } });
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
               { name: 'About us', path: '/' },
              { name: 'Products', path: '/products' },
              { name: 'Categories', path: '/categories' },
             
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
            <Link to="/basket">
              <div className={styles.basketIcon} >
                <Basket />
                { rootStore.BasketStore.totalItems > 0 && (
                  <span className={styles.basketCount}>{ rootStore.BasketStore.totalItems}</span>
                )}
              </div>
            </Link>
            {rootStore.QueryStore.getQueryParam('auth') ? (
          <Link to="/profile">
            <User />
          </Link>
        ) : (
          <Link to="/auth"> 
            <User />
          </Link>
        )}
             
            {rootStore.QueryStore.getQueryParam('auth') && (
              <div onClick={handleLogout} className={styles.logoutButton}>
                <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Logout"> <g> <path d="M20.968,18.448a2.577,2.577,0,0,1-2.73,2.5c-2.153.012-4.306,0-6.459,0a.5.5,0,0,1,0-1c2.2,0,4.4.032,6.6,0,1.107-.016,1.589-.848,1.589-1.838V5.647A1.546,1.546,0,0,0,19,4.175a3.023,3.023,0,0,0-1.061-.095H11.779a.5.5,0,0,1,0-1c2.224,0,4.465-.085,6.687,0a2.567,2.567,0,0,1,2.5,2.67Z"></path> <path d="M3.176,11.663a.455.455,0,0,0-.138.311c0,.015,0,.028-.006.043s0,.027.006.041a.457.457,0,0,0,.138.312l3.669,3.669a.5.5,0,0,0,.707-.707L4.737,12.516H15.479a.5.5,0,0,0,0-1H4.737L7.552,8.7a.5.5,0,0,0-.707-.707Z"></path> </g> </g> </g></svg>
              </div>
            )}
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
});

export default Header;