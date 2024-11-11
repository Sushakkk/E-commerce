import React, { useEffect} from 'react';
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
import QueryStore from 'stores/QueryStore/QueryStore';

const HomePage: React.FC = observer(() => {
  const {totalProducts, currentPage} = ProductStore;
  const {selectedCategory, searchQuery } = FilterStore;


  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search') || FilterStore.searchQuery;
    const categoryId = params.get('category') || (FilterStore.selectedCategory?.key ? String(FilterStore.selectedCategory.key) : '');
    const page = params.get('page') || String(ProductStore.currentPage);

    const initializeFilters = async () => {
      await FilterStore.fetchCategories(); 
      QueryStore.setQueryParams(search, categoryId,page ); 
    };

    initializeFilters();
  }, []); 

  useEffect(() => {
    if (QueryStore.queryLoaded) {
      ProductStore.fetchProducts(searchQuery, selectedCategory?.key)
    }
  }, [QueryStore.queryLoaded, searchQuery, selectedCategory, currentPage]); 



  if (!QueryStore.queryLoaded || !ProductStore.productsLoaded) {
    return (
      <main className="page">
        <div className="page__loader">
          <Loader />
        </div>
      </main>
    );
  }



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
                <Text view="p-20" color="accent" weight="bold">
                  {totalProducts}
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
