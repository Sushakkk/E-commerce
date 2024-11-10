import React, { useEffect, useState } from 'react';
import Loader from 'components/Loader';
import Text from 'components/Text/Text';
import styles from './HomePage.module.scss';
import Pagination from './components/Pagination/Pagination';
import ProductList from './components/ProductList/ProductList';
import Filters from './components/Filters/Filters';
import ProductStore from 'stores/ProductStore/ProductStore';
import { observer } from 'mobx-react-lite';
import FilterStore from 'stores/FilterStore/FilterStore';
import { useLocation } from 'react-router-dom';

const HomePage: React.FC = observer(() => {
  const { loading, error, totalProducts} = ProductStore;
  const { selectedCategory, searchQuery } = FilterStore;

  const [filtersLoaded, setFiltersLoaded] = useState(false);
  const [productsLoaded, setProductsLoaded] = useState(false); 

  const location = useLocation();

  // Загрузка категорий и параметров до рендера
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search') || '';
    const categoryId = params.get('category') || '';

    const initializeFilters = async () => {
      await FilterStore.fetchCategories(); 
      FilterStore.setQueryParams(search, Number(categoryId)); 
      setFiltersLoaded(true); 
    };

    initializeFilters();
  }, []); 

  useEffect(() => {
    if (filtersLoaded) {
      ProductStore.fetchProducts(searchQuery, selectedCategory?.key)
        .then(() => setProductsLoaded(true))
        .catch(() => setProductsLoaded(true)); 
    }
  }, [filtersLoaded, searchQuery, selectedCategory]); // Загружаем продукты после фильтров

  // Логика рендера
  if (!filtersLoaded || !productsLoaded || loading) {
    return (
      <main className="page">
        <div className="page__loader">
          <Loader />
        </div>
      </main>
    );
  }

  if (error) return <div className={styles['error-message']}>{error}</div>;

  return (
    <main id="main" className="page">
      <div className={styles['page__main-block']}>
        <div className={styles['products__content']}>
          <div className={styles['products__header']}>
            <div className={styles['products__title']}>
              <Text view="title">Products</Text>
            </div>
            <div className={styles['products__description']}>
              <Text view="p-20" color="secondary">
                We display products based on the latest products we have. If you want to see our old products, please enter the name of the item.
              </Text>
            </div>
          </div>
          <Filters />
          <div className={styles['products__body']}>
            <div className={styles['products__subtitle']}>
              <Text view="p-32" className="page-title" weight="bold">Total Products</Text>
              {/* Здесь отображаем количество товаров только после загрузки */}
              <Text view="p-20" color="accent" weight="bold">
                {totalProducts !== null ? totalProducts : 'Loading...'}
              </Text>
            </div>
            <ProductList />
          </div>

          <Pagination />
        </div>
      </div>
    </main>
  );
});

export default HomePage;
