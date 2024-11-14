import React, { useCallback, useState } from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import { observer } from 'mobx-react-lite';
import styles from './Filters.module.scss';
import FilterStore from 'stores/FilterStore/FilterStore';


const Filters: React.FC = observer(() => {
  const handleSearchChange = useCallback((value: string) => {
    FilterStore.setSearchValue(value);  
  }, []);

  const handleSearchSubmit = useCallback(() => {
    FilterStore.applySearch();
  }, []);

  const handleCategoryChange = useCallback((category: Option | null) => {
    FilterStore.handleCategoryChange(category);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  }, [handleSearchSubmit]);

  return (
    <div className={styles['products__controls']}>
      <div className={styles['products__search']}>
        <div className={styles['products__search-column--left']}>
          <Input
            value={FilterStore.searchValue}  
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown} 
            placeholder="Search product"
          />
        </div>
        <Button
          className={styles['products__search-column--right']}
          onClick={handleSearchSubmit}
        >
          Find Now
        </Button>
      </div>
      <div className={styles['products__filter']}>
        <MultiDropdown
          options={FilterStore.getCategories()}
          value={FilterStore.selectedCategory?.value ?? null}
          onChange={handleCategoryChange}
          getTitle={(value) => value ? value : 'Filter'}
        />
      </div>
    </div>
  );
});



export default Filters;
