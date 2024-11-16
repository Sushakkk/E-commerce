import React from 'react';
import classNames from 'classnames';
import CheckIcon from '../icons/CheckIcon/CheckIcon';
import styles from './CheckBox.module.scss';

export type CheckBoxProps = {
  checked?: boolean;
  disabled?: boolean;
  hoverDisabled?: boolean;
  className?: string;
  onChange?: (checked: boolean) => void;
  'data-testid'?: string;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  checked = false,
  disabled = false,
  hoverDisabled = false,
  className = '',
  onChange,
  'data-testid': testId,
}) => {
  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const iconColor = disabled ? 'disabled' : 'accent';

  return (
    <label
      className={classNames(
        styles.checkbox__label,
        { [styles.checkbox__disabled]: disabled },
        { [styles.checkbox__hover_disabled_false]: !hoverDisabled },
        className
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        className={styles.checkbox__input}
        data-testid={testId}
        style={{ '--hover-disabled': hoverDisabled ? 'true' : 'false' } as React.CSSProperties}
      />
      {checked ? (
        <CheckIcon className={styles.checkbox__custom} color={iconColor} width={40} height={40} />
      ) : (
        <div className={styles.checkbox__custom}></div>
      )}
    </label>
  );
};

export default CheckBox;
