
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ProductPage from './pages/ProductPage/ProductPage';
import Header from './components/Header/Header';
import './styles/null.scss'
import './styles/styles.scss'
import { useEffect } from 'react';

function App() {

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [location.pathname]); 

  return (
    <div className="wrapper">
      <Header />
  
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/product/:id" element={<ProductPage/>} />
        </Routes>

    </div>
  );
}

export default App;
