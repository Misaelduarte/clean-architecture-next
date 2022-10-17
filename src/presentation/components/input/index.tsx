import { forwardRef, Fragment, Ref, useCallback, useState } from 'react';
import classNames from 'classnames';
import InputMask from 'react-input-mask';

import styles from './styles.module.scss';

export type InputProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'onChange' | 'ref'
> & {
  type?: 'text' | 'email' | 'password' | 'tel' | 'number';
  label: string;
  value: string | number;
  error?: string | string[];
  disableAutofill?: boolean;
  iconRight?: React.ReactNode;
  onChange?: (value: string) => void;
  mask?: string;
  disablePaste?: boolean;
};

const InputComponent = (
  {
    name,
    label,
    className,
    value,
    error,
    onChange,
    disableAutofill,
    onFocus,
    iconRight,
    mask,
    type = 'text',
    disablePaste,
    placeholder,
    readOnly,
    id = name,
    ...otherProps
  }: InputProps,
  ref?: Ref<HTMLInputElement>
) => {
  const [isInitiallyReadOnly, setIsInitiallyReadOnly] = useState(disableAutofill);

  const disableInitialReadOnly = useCallback(() => {
    setIsInitiallyReadOnly(false);
  }, []);

  const handleFocus = useCallback(
    event => {
      if (disableAutofill) {
        disableInitialReadOnly();
      }
      onFocus?.(event);
    },
    [disableAutofill, disableInitialReadOnly, onFocus]
  );

  const renderSingleError = useCallback(
    (error: string) => {
      return (
        <span className={styles.error} data-testid={`${name}-error`}>
          {error}
        </span>
      );
    },
    [name]
  );

  const renderErrorArray = useCallback(
    (errors: string[]) => {
      return (
        <div className={styles['errors-container']} data-testid={`${name}-error`}>
          {errors.map(errorMessage => (
            <Fragment key={errorMessage}>{renderSingleError(errorMessage)}</Fragment>
          ))}
        </div>
      );
    },
    [name, renderSingleError]
  );

  const renderError = useCallback(() => {
    if (!error || error.length === 0) {
      return null;
    }
    if (error instanceof Array) {
      return renderErrorArray(error);
    }
    return renderSingleError(error);
  }, [error, renderErrorArray, renderSingleError]);

  const renderInput = () => (
    <div className={classNames(styles.container, className)}>
      <input
        {...otherProps}
        type={type}
        value={mask ? undefined : value}
        className={classNames(styles.input, {
          [styles['input-error']]: error && error.length > 0,
        })}
        onChange={event => !mask && onChange?.(event.target.value)}
        readOnly={isInitiallyReadOnly || readOnly}
        onFocus={handleFocus}
        placeholder={placeholder}
        ref={ref}
        id={id}
        onPaste={disablePaste ? e => e.preventDefault() : undefined}
      />
      <label
        htmlFor={id}
        className={classNames(styles.label, { [styles['has-text']]: value || placeholder })}
      >
        {label}
      </label>
      {renderError()}
      {iconRight && <span className={styles['icon-right']}>{iconRight}</span>}
    </div>
  );

  if (mask) {
    return (
      <InputMask
        mask={mask}
        value={value}
        onChange={event => onChange?.(event.target.value)}
        maskChar={null}
      >
        {renderInput}
      </InputMask>
    );
  }
  return renderInput();
};

export const Input = forwardRef<HTMLInputElement, InputProps>(InputComponent);
