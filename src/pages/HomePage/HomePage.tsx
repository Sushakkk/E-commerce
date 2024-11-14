import React, { useEffect} from 'react';
import Loader from 'components/Loader';
import Text from 'components/Text/Text';
import styles from './HomePage.module.scss';
import Pagination from './components/Pagination/Pagination';
import ProductList from './components/ProductList/ProductList';
import Filters from './components/Filters/Filters';
import { observer } from 'mobx-react-lite';
import FilterStore from 'stores/FilterStore/FilterStore';
import QueryStore from 'stores/QueryStore/QueryStore';
import ProductsStore from 'stores/ProductsStore/ProductsStore';

const HomePage: React.FC = observer(() => {
  const {totalProducts, currentPage} = ProductsStore;
  const {selectedCategory, searchQuery } = FilterStore;


  useEffect(()=>{
    QueryStore.updateQueryParams();
  }, [])



  useEffect(() => {
    if (QueryStore.queryLoaded && FilterStore.ParamsMeta ==='success') {
      ProductsStore.fetchProducts(searchQuery, selectedCategory?.key)
    }
  }, [QueryStore.queryLoaded, searchQuery, selectedCategory, currentPage, FilterStore.ParamsMeta]); 



  if (!QueryStore.queryLoaded || ProductsStore.meta==='loading' || FilterStore.ParamsMeta ==='loading') {
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