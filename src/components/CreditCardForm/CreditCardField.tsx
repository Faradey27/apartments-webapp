import React, { useCallback } from 'react';
import MaskInputRaw from 'react-maskinput';
import clsx from 'clsx';

import styles from './CreditCardField.module.scss';

// TODO MaskInput has based build in types, we need to override it properly
const MaskInput: any = MaskInputRaw;

interface CreditCardFieldProps {
  name: string;
  label: string;
  mask?: string;
  maskString?: string;
  maskChar?: string;
  error?: string | boolean;
  value?: string;
  suffix?: React.ReactNode;
  onChange: (event: any) => void;
  onBlur: (event: any) => void;
}

const CreditCardField: React.FC<CreditCardFieldProps> = ({
  name,
  value,
  mask,
  maskChar,
  maskString,
  error,
  label,
  suffix,
  onChange,
  onBlur,
}) => {
  const handleValueChange = useCallback(
    ({ value }) => {
      onChange({ target: { name, id: name, value } });
    },
    [name, onChange]
  );

  const input = mask ? (
    <MaskInput
      name={name}
      className={clsx(styles.input, {
        [styles.inputError]: error,
      })}
      value={value}
      onValueChange={handleValueChange}
      onBlur={onBlur}
      maskChar={maskChar}
      mask={mask}
      maskString={maskString}
      alwaysShowMask
    />
  ) : (
    <input
      name={name}
      className={clsx(styles.input, {
        [styles.inputError]: error,
      })}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
    />
  );

  return (
    <label className={styles.field}>
      {label}
      <div className={styles.inputWrapper}>
        {input}
        {suffix ? <span className={styles.suffix}>{suffix}</span> : null}
      </div>
      <span className={styles.error}>{error}</span>
    </label>
  );
};

export default CreditCardField;
