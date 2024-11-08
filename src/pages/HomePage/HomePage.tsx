import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from 'components/Loader';
import Text from 'components/Text/Text';
import Input from 'components/Input';
import Button from 'components/Button';
import MultiDropdown from 'components/MultiDropdown';
import Card from 'components/Card';
import PaginationIcon from 'components/PaginationIcon/PaginationIcon';
import { useNavigate } from 'react-router-dom';
import { handleCardClick } from 'utils/navigationUtils';
import styles from './HomePage.module.scss';
import '../../styles/styles.scss'

export interface ProductI {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: { name: string };
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const productsPerPage = 9;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const fetchProducts = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.escuelajs.co/api/v1/products', {
        params: { offset: (page - 1) * productsPerPage, limit: productsPerPage },
      });
      setProducts(response.data);

      const totalResponse = await axios.get('https://api.escuelajs.co/api/v1/products', { params: { limit: 0 } });
      setTotalProducts(totalResponse.data.length);
    } catch (error) {
      setError('Не удалось загрузить данные');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPaginationRange = () => {
    const range: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) range.push(i);
    } else {
      if (currentPage <= 3) {
        range.push(1, 2, 3, '...', totalPages);
      } else if (currentPage < totalPages - 2) {
        range.push(1, '...', currentPage, '...', totalPages);
      } else {
        range.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      }
    }
    return range;
  };

  if (loading) return (
    <main className='page'>
      <div className='page__loader _container'>
        <Loader />
      </div>
      </main>
  );
  if (error) return <div className={styles['error-message']}>{error}</div>;

  return (
    <main id="main" className='page'>
      <div className={`${styles['page__main-block']} _container`}>
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
          <div className={styles['products__controls']}>
            <div className={styles['products__search']}>
              <div className={styles['products__search-column--left']}>
                <Input value={searchValue} onChange={setSearchValue} placeholder="Search product" />
              </div>
              <Button  width='137px' className={styles['products__search-column--right']}>Find now</Button>
            </div>
            <div className={styles['products__filter']}>
              <MultiDropdown
                options={[{ key: '1', value: 'Furniture' }, { key: '2', value: 'Electronics' }]}
                value={[]}
                onChange={() => {}}
                getTitle={() => 'Filter'}
              />
            </div>
          </div>
          <div className={styles['products__body']}>
            <div className={styles['products__subtitle']}>
              <Text view="p-32" className="page-title" weight="bold">Total Products</Text>
              <Text view="p-20" color="accent" weight="bold">{totalProducts}</Text>
            </div>
            <section className={`${styles['products__cards']} _cards`}>
              {products.map((product) => (
                <div className={styles['products__column']} key={product.id}>
                  <Card
                    image={product.images[0]}
                    title={product.title}
                    subtitle={product.description}
                    captionSlot={product.category.name}
                    contentSlot={`$${product.price}`}
                    actionSlot={<Button>Add to Cart</Button>}
                    className={styles['products__card']}
                    onClick={() => handleCardClick(product, products, navigate)}
                  />
                </div>
              ))}
            </section>
          </div>
          <div className={styles['products__pagination']}>
            <div onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}>
              <PaginationIcon color={currentPage > 1 ? 'primary' : 'secondary'} />
            </div>
            <div className={styles['products__pagination-buttons']}>
              {getPaginationRange().map((page, index) => (
                <Button
                  key={index}
                  width={38}
                  height={42}
                  className={`${styles['pagination-button']} ${page === currentPage ? styles['active-page'] : ''}`}
                  onClick={() => typeof page === 'number' && handlePageChange(page)}
                >
                  {page}
                </Button>
              ))}
            </div>
            <div onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}>
              <PaginationIcon direction="right" color={currentPage + 1 <= totalPages ? 'primary' : 'secondary'} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
