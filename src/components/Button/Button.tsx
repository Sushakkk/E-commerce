import React from 'react';
import styles from './Button.module.scss'; 

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  object: {a: string} | null
};

const Button: React.FC<ButtonProps> = ({ 

  children,
  object
  

}) => {
  return (
    <button className={styles.button} onClick={(async) => {object?.a}}
    >
     {children}
    </button>
  );
};

export default Button;
