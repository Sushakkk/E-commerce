import  { useCallback } from 'react';

const useImageHandler = () => {
  const getImage = useCallback((url?: string): string => {
    const cleanedUrl = url?.replace(/[\[\]"]/g, '');
    return cleanedUrl && !cleanedUrl.includes('any')
      ? cleanedUrl
      : 'https://walls.ru/f/product/BN%20219282_1m.jpg';
  }, []);

  return { getImage };
};

export default useImageHandler;
