import React, { useEffect, useState } from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import { observer } from 'mobx-react-lite';
import styles from './Filters.module.scss';
import FilterStore from 'stores/FilterStore/FilterStore';

const Filters: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');


  const handleCategoryChange = (category: Option) => {
    FilterStore.setSelectedCategory(category)
    

  };



  useEffect(() => {
    FilterStore.fetchCategories();
  }, []);

  return (
    <div className={styles['products__controls']}>
      <div className={styles['products__search']}>
        <div className={styles['products__search-column--left']}>
          <Input value={searchValue} onChange={setSearchValue} placeholder="Search product" />
        </div>
        <Button className={styles['products__search-column--right']}>
          Find now
        </Button>
      </div>
      <div className={styles['products__filter']}>
        <MultiDropdown
          options={FilterStore.categories}
          value={FilterStore.selectedCategory?.value ?? null}  
          onChange={handleCategoryChange}  
          getTitle={(value) => value ? value : 'Filter'}  
        />
      </div>
    </div>
  );
};

export default observer(Filters);
