import React, { useEffect } from 'react';
import Loader from 'components/Loader';
import Text from 'components/Text/Text';
import styles from './HomePage.module.scss';

import Filters from './components/Filters/Filters';
import { observer } from 'mobx-react-lite';
import { useLocalStore } from 'hooks/useLocalStore';
import ProductsStore from 'stores/ProductsStore/ProductsStore';
import FilterStore from 'stores/FilterStore/FilterStore';
import rootStore from 'stores/RootStore/instance';
import ProductList from 'components/ProductList';
import Pagination from 'components/Pagination';


const HomePage: React.FC = observer(() => {
 
  const localProductsStore = useLocalStore(() => new ProductsStore());
  const localFilterStore = useLocalStore(() => new FilterStore());
  const { totalProducts, currentPage } = localProductsStore;
  const { selectedCategory, searchQuery } = localFilterStore;
  const queryParams = rootStore.QueryStore.getQueryParams();



  useEffect(() => {
    if (Object.keys(queryParams).length === 0) {
      localFilterStore.selectedCategory=null;
      localFilterStore.searchQuery=''
      localProductsStore.currentPage=1;
      localProductsStore.fetchProducts(searchQuery, selectedCategory?.key,null);
    }
  }, [queryParams]);

  useEffect(() => {
    
    rootStore.QueryStore.updateQueryParams();
    localFilterStore.initializeParams()
  }, []);

  useEffect(() => {
    
    
    if ( rootStore.QueryStore.queryLoaded && localFilterStore.ParamsMeta === 'success') {
      localProductsStore.fetchProducts(searchQuery, selectedCategory?.key,null);
    }
  }, [ rootStore.QueryStore.queryLoaded, searchQuery, selectedCategory, currentPage, localFilterStore.ParamsMeta]);

  if (! rootStore.QueryStore.queryLoaded || localProductsStore.meta === 'loading' || localFilterStore.ParamsMeta === 'loading') {
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
          <Filters filterStore={localFilterStore} />
          <div className={styles['products__body']}>
            <div className={styles['products__subtitle']}>
              <Text view="p-32" className="page-title" weight="bold">Total Products</Text>
              <Text view="p-20" color="accent" weight="bold">
                {totalProducts}
              </Text>
            </div>
            <ProductList productsStore={localProductsStore}  />
          </div>

          <Pagination productsStore={localProductsStore} />
        </div>
      </div>
    </main>
  );
});

export default HomePage;
