import React, { useCallback} from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import { observer } from 'mobx-react-lite';
import styles from './Filters.module.scss';
import FilterStore from 'stores/FilterStore/FilterStore';


interface FiltersProps {
  filterStore: FilterStore; 
}

const Filters: React.FC<FiltersProps> = observer(({ filterStore }) => {
  
  
  const handleSearchChange = useCallback((value: string) => {
    filterStore.setSearchValue(value);
  }, [filterStore]);

  const handleSearchSubmit = useCallback(() => {
    filterStore.applySearch();
  }, [filterStore]);

  const handleCategoryChange = useCallback((category: Option | null) => {
    filterStore.handleCategoryChange(category);
  }, [filterStore]);

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
            value={filterStore.searchValue}
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
          options={filterStore.getCategories()}
          value={filterStore.selectedCategory?.value ?? null}
          onChange={handleCategoryChange}
          getTitle={(value) => value ? value : 'Filter'}
        />
      </div>
    </div>
  );
});

export default Filters;
