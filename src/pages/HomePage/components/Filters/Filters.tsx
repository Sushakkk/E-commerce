import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Input from 'components/Input';
import Button from 'components/Button';
import MultiDropdown from 'components/MultiDropdown';
import styles from './Filters.module.scss';
import FilterStore from 'stores/FilterStore/FilterStore';

const Filters: React.FC = observer(() => {
  useEffect(() => {
    // Загружаем категории при монтировании компонента
    FilterStore.fetchCategories();
  }, []);

  // Обработчик для изменения строки поиска
  const handleSearchChange = (value: string) => {
    FilterStore.setSearchQuery(value);  // Обновляем строку поиска в FilterStore
  };

  // Обработчик для изменения категории
  const handleCategoryChange = (selectedKeys: { key: string; value: string }[]) => {
    // Обновляем выбранную категорию в FilterStore
    FilterStore.setSelectedCategory(selectedKeys.length > 0 ? selectedKeys[0].key : null);  // Используем key для сохранения категории
  };

  return (
    <div className={styles['products__controls']}>
      <div className={styles['products__search']}>
        <div className={styles['products__search-column--left']}>
          <Input 
            value={FilterStore.searchQuery} 
            onChange={handleSearchChange}  // Обновляем строку поиска
            placeholder="Search product" 
          />
        </div>
        <Button className={styles['products__search-column--right']}>
          Find now
        </Button>
      </div>
      <div className={styles['products__filter']}>
        <MultiDropdown
          options={FilterStore.categories}
          value={FilterStore.selectedCategory ? [{ key: FilterStore.selectedCategory, value: FilterStore.selectedCategory }] : []}  // Отображаем выбранную категорию
          onChange={handleCategoryChange}  // Обрабатываем изменение категории
          getTitle={() => 'Filter'}
        />
      </div>
    </div>
  );
});

export default Filters;
