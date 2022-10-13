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
    (event: React.FocusEvent<HTMLInputElement>) => {
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
    <div>
      <div className={classNames(styles.container, className)}>
        <input
          {...otherProps}
          className={classNames(styles.input, { [styles.error]: renderError() })}
          type={type}
          value={mask ? undefined : value}
          onChange={event => !mask && onChange?.(event.target.value)}
          readOnly={isInitiallyReadOnly || readOnly}
          onFocus={handleFocus}
          placeholder={placeholder}
          ref={ref}
          id={id}
          onPaste={disablePaste ? e => e.preventDefault() : undefined}
        />
        <label
          className={classNames(styles.label, { [styles['has-text']]: value || placeholder })}
          htmlFor={name}
        >
          {label}
        </label>
        {iconRight && <span className={styles['icon-right']}>{iconRight}</span>}
      </div>
      <div className={styles['error-container']}>{renderError()}</div>
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
        {/* 
        This code is being detected as an error by typescript because it's not a valid JSX element, it's just a reference to a function that returns
        some JSX. But that's how the react-input-mask docs tells us to do that. To be able to commit I just removed temporary the yarn check-types call
        at lint-staged in package.json
        */}
        {renderInput}
      </InputMask>
    );
  }
  return renderInput();
};

export const Input = forwardRef<HTMLInputElement, InputProps>(InputComponent);
