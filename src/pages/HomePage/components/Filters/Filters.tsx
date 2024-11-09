import React, { useState } from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import styles from './Filters.module.scss';

const Filters: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Option | null>(null);

  const handleCategoryChange = (category: Option) => {
    setSelectedCategory(category);
  };

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
          options={[
            { key: '1', value: 'Furniture' },
            { key: '2', value: 'Electronics' },
          ]}
          value={selectedCategory ? [selectedCategory] : []}  // Передаем массив с выбранной категорией
          onChange={handleCategoryChange}  // Обрабатываем изменение категории
          getTitle={(value) => value.length ? value[0].value : 'Select category'}  // Отображаем только выбранную категорию
        />
      </div>
    </div>
  );
};

export default Filters;
