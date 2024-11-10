import React, { useCallback,useState} from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import { observer } from 'mobx-react-lite';
import styles from './Filters.module.scss';
import FilterStore from 'stores/FilterStore/FilterStore';
import ProductStore from 'stores/ProductStore/ProductStore';



const Filters: React.FC = observer(() => {

  const [searchValue, setSearch] = useState(FilterStore.searchQuery);
  

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    ProductStore.setCurrentPage(1);
  }, []);

  const handleSearchSubmit = () => {
    FilterStore.setSearchQuery(searchValue)
    FilterStore.applySearch(); 
  };

  const handleCategoryChange = (category: Option | null) => {
    FilterStore.setSelectedCategory(category ?? null);
    ProductStore.setCurrentPage(1);
  };



  return (
    <div className={styles['products__controls']}>
      <div className={styles['products__search']}>
        <div className={styles['products__search-column--left']}>
            <Input
                value={searchValue}
                onChange={handleSearchChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchSubmit();
                  }
                }}
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
          options={FilterStore.categories}
          value={FilterStore.selectedCategory?.value ?? null}
          onChange={handleCategoryChange}
          getTitle={(value) => value ? value : 'Filter'}
        />
      </div>
    </div>
  );
});

export default Filters;
