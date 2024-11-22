
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

function App() {



  const location = useLocation(); 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="wrapper">
      <ScrollToTop/>
      <Header />
  
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/product/:id" element={<ProductPage/>} />
          <Route path="/categories" element={<CategoriesPage/>} />
          <Route path="/category/:id" element={<CategoryPage/>} />
          <Route path="/about" element={<AboutPage/>} />
        </Routes>

    </div>
  );
}

export default App;
