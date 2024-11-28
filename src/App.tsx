
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import './styles/null.scss'
import './styles/styles.scss'
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CategoriesPage from './pages/CategoriesPage/CategoriesPage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import ScrollToTop from 'components/ScrollToTop/ScrollToTop';
import AboutPage from './pages/AboutPage/AboutPage';
import AuthorizePage from './pages/AuthorizePage/AuthorizePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import rootStore from 'stores/RootStore';
import BasketPage from './pages/BasketPage/BasketPage';
import Footer from 'components/Footer/Footer';





function App() {
  const token = rootStore.QueryStore.getQueryParam('auth');



  const location = useLocation(); 

  useEffect(() => {

    window.scrollTo(0, 0);
  }, [location]);


  useEffect(() => {
    if(token){
      rootStore.QueryStore.addQueryParam('auth', String(token));
    }
  }, [rootStore.AuthStore.token,location]);

  useEffect(() => {
    rootStore.QueryStore.setQueryParam('auth', token);
    rootStore.AuthStore.setUser()
   if( rootStore.AuthStore.user){
    rootStore.AuthStore.user.orderCount=0
   }
  }, []);


  return (
    <div className="wrapper">
      <ScrollToTop/>
      <Header />
  
        <Routes>
          <Route path="/products" element={<HomePage/>} />
          <Route path="/product/:id" element={<ProductPage/>} />
          <Route path="/categories" element={<CategoriesPage/>} />
          <Route path="/category/:id" element={<CategoryPage/>} />
          <Route path="/auth" element={<AuthorizePage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/" element={<AboutPage/>} />
          <Route path="/basket" element={<BasketPage />} />
    
        </Routes>
        <Footer/>

    </div>
  );
}

export default App;
