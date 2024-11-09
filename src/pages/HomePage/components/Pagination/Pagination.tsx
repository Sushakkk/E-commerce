import React from 'react';
import Button from 'components/Button';
import PaginationIcon from 'components/PaginationIcon/PaginationIcon';
import styles from './Pagination.module.scss';
import ProductStore from 'stores/ProductStore/ProductStore';



const Pagination: React.FC = () => {
    const {totalPages, currentPage, setCurrentPage} = ProductStore; 


  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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

  return (
    <div className={styles.pagination__container}>
      <div onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}>
        <PaginationIcon color={currentPage > 1 ? 'primary' : 'secondary'} />
      </div>
      <div className={styles.pagination__buttons}>
        {getPaginationRange().map((page, index) => (
          <Button
            key={index}
            className={`${styles.pagination__button} ${page === currentPage ? styles.active__page : ''}`}
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
  );
};

export default Pagination;
