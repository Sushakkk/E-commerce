import React, { useEffect } from 'react';
import Loader from 'components/Loader';
import Text from 'components/Text/Text';
import styles from './CategoryPage.module.scss';
import { observer } from 'mobx-react-lite';
import { useLocalStore } from 'hooks/useLocalStore';
import ProductsStore from 'stores/ProductsStore/ProductsStore';
import BackButton from 'components/BackButton/BackButton';
import ProductList from 'components/ProductList';
import Pagination from 'components/Pagination';
import { useParams } from 'react-router-dom';
import FilterStore from 'stores/FilterStore';


const CategoryPage: React.FC = observer(() => {
  const { id } = useParams<{ id: string }>();
 
  const localProductsStore = useLocalStore(() => new ProductsStore());
  const localFiltersStore = useLocalStore(() => new FilterStore());
  const category = localFiltersStore.getCategoryById(Number(id)) ;
  const categoryName = category ? category.value : 'Category not found';

  const { totalProducts, currentPage } = localProductsStore;
  const searchQuery ='';


  useEffect(() => {
    localProductsStore.currentPage=1;
}, []);


  useEffect(() => {
      localProductsStore.fetchProducts(searchQuery, Number(id),currentPage);
  }, [currentPage]);

  if (localProductsStore.meta === 'loading' || localFiltersStore.meta === 'loading') {
    return (
      <main className="page">
        <div className="page__loader">
          <Loader />
        </div>
      </main>
    );
  }
  console.log(localProductsStore.products)

  return (
    <main id="main" className="page">
      <div className={styles['page__main-block']}>
        <div className={styles['category__content']}>
            <BackButton/>
          <div className={styles['category__header']}>
            <div className={styles['category__title']}>
              <Text view="title">{categoryName}</Text>
            </div>
            <div className={styles['category__description']}>
              <Text view="p-20" color="secondary">
              Explore our diverse collection of top-quality products, crafted to meet your needs and elevate your lifestyle.
              </Text>
            </div>
          </div>
          <div className={styles['category__body']}>
            <div className={styles['category__subtitle']}>
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

export default CategoryPage;
