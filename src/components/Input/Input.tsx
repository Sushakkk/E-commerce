import React from 'react';
import styles from './Input.module.scss'; 

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value?: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { value, onChange, afterSlot, type = 'text', className = '', disabled, placeholder, ...rest },
    ref
  ) => {
    
    const wrapperClassNames = [
      styles['input-wrapper'], 
      className,
      disabled ? styles['input-disabled'] : '',
      value ? styles['input-not-empty'] : styles['input-empty'],
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClassNames}>
        <input
          {...rest} 
          ref={ref}
          type={type}
          value={value || ''}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)} 
          className={styles['input-element']} 
          disabled={disabled}
        />
        {afterSlot && (
          <div className={styles['input-after-slot']}> 
            {afterSlot}
          </div>
        )}
      </div>
    );
  }
);

export default React.memo(Input);
