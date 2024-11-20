import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './MultiDropdown.module.scss';
import Input from '../Input/Input';
import Text from '../Text/Text'; 
import ArrowDownIcon from '../icons/ArrowDownIcon';

export type Option = {
  key: number;
  value: string;
  img: string ;
  productCount: number, 
};

export type MultiDropdownProps = {
  className?: string;
  options: Option[];
  value: string | null;
  onChange: (value: Option | null) => void; 
  disabled?: boolean;
  getTitle: (value: string | null) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentInput, setCurrentInput] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleInputChange = useCallback((inputValue: string) => {
    setCurrentInput(inputValue);
    const newFilteredOptions = options.filter((option) =>
      option.value.toLowerCase().startsWith(inputValue.toLowerCase())
    );
    setFilteredOptions(newFilteredOptions);
  }, [options]);

  const handleOptionClick = useCallback((option: Option) => {
    onChange(option);
    setIsOpen(false);
  }, [onChange]);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !currentInput) {
      onChange(null); 
      setIsOpen(false);
    }
  }, [currentInput, onChange]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [handleClickOutside]);

  const handleInputClick = useCallback(() => {
    if (!disabled) {
      setIsOpen(true);
    }
  }, [disabled]);

  return (
    <div className={`${styles.multiDropdown__container} ${className}`} ref={dropdownRef}>
      <Input
        type="text"
        value={value ? getTitle(value) : currentInput}
        onClick={handleInputClick}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} 
        placeholder={getTitle(value)}
        disabled={disabled}
        afterSlot={<ArrowDownIcon color="secondary" />}
      />

      {isOpen && !disabled && (
        <div className={styles.multiDropdown__options}>
          {filteredOptions.map((option) => (
            <div
              key={option.key}
              className={styles.multiDropdown__option}
              onClick={() => handleOptionClick(option)}
              data-testid={option.key}
            >
              <Text className={styles.multiDropdown__optionText}>
                {option.value}
              </Text>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(MultiDropdown);
