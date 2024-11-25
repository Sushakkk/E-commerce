import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import FilterStore from 'stores/FilterStore/FilterStore';
import { useLocalStore } from 'hooks/useLocalStore';
import Text from 'components/Text/Text';
import styles from './CategoriesPage.module.scss';
import Card from 'components/Card';
import Loader from 'components/Loader';
import { useNavigate } from 'react-router-dom'; 
import useImageHandler from 'hooks/useImageHandler';



const CategoriesPage: React.FC = () => {
  const localFiltersStore = useLocalStore(() => new FilterStore());
  const navigate = useNavigate(); 
  const { getImage } = useImageHandler();

 
 

  useEffect(() => {
    if (localFiltersStore.getCategories().length === 0) {
      localFiltersStore.fetchCategories();
    }
  }, [localFiltersStore]);

  const categories = localFiltersStore.getCategories();

  const handleCategoryClick = (categoryId: number) => {
    navigate(`/category/${categoryId}`);
  };

  if (localFiltersStore.meta === 'loading') {
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
        <div className={styles.categories__content}>
          <div className={styles.categories__title}>
          <Text view="title">
            Categories
          </Text>
          <Text  className={styles.categories__subtitle} view="p-20" color="secondary">
          Discover a wide variety of premium products, each carefully curated to suit your preferences and needs. From the latest trends to timeless essentials, we offer a selection designed to enhance your lifestyle. Start exploring today and find exactly what you're looking for!
              </Text>
          </div>
          <section className={styles['categories__cards']}>
            {categories.map((category) => (
              <div className={styles['categories__column']} key={category.key}>
                <Card
                        key={category.key}
                        image={getImage(category.img)}
                        title={category.value}
                        className={styles.categoryCard}
                        onClick={() => handleCategoryClick(category.key)} 
                        subtitle={`Total Products: ${category.productCount}`}                
                />
              </div>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
};

export default observer(CategoriesPage);
