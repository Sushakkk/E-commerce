import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './MultiDropdown.module.scss';
import Input from '../Input/Input';
import Text from '../Text/Text'; 
import ArrowDownIcon from '../icons/ArrowDownIcon';


export type Option = {
  key: number;
  value: string;
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
  }, []);
  
  const handleOptionClick = useCallback((option: Option) => {
    onChange(option);
    setIsOpen(false);
  }, [onChange]);
  
 
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !currentInput) {
      onChange(null);
    }
  }, [currentInput, onChange]);
  


  useEffect(() => {
    if (currentInput) {
      const newFilteredOptions = options.filter((option) =>
        option.value.toLowerCase().startsWith(currentInput.toLowerCase())
      );
      setFilteredOptions(newFilteredOptions);
    } else {
      setFilteredOptions(options);
    }
  }, [currentInput, options]);
  

  return (
    <div className={`${styles.multiDropdown__container} ${className}`} ref={dropdownRef}>
      <Input
        type="text"
        value={value ? getTitle(value) : currentInput}
        onClick={() => !disabled && setIsOpen(true)}
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
