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
      styles['input-wrapper'], // Используем styles из CSS Modules
      className,
      disabled ? styles['input-disabled'] : '',
      value ? styles['input-not-empty'] : styles['input-empty'],
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClassNames}>
        <input
          {...rest} // Передаем все остальные пропсы
          ref={ref}
          type={type}
          value={value || ''}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)} // Обработчик onChange
          className={styles['input-element']} // Используем styles из CSS Modules
          disabled={disabled}
        />
        {afterSlot && (
          <div className={styles['input-after-slot']}> {/* Используем styles из CSS Modules */}
            {afterSlot}
          </div>
        )}
      </div>
    );
  }
);

export default Input;
