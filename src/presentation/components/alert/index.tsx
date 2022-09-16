import { useState, useCallback, useEffect } from 'react';
import classNames from 'classnames';

import CheckIcon from '@/presentation/assets/svgs/check-icon.svg';
import CloseIcon from '@/presentation/assets/svgs/close-icon.svg';

import styles from './styles.module.scss';

export type AlertType = 'success' | 'error';

type AlertProps = {
  type: AlertType;
  text: string;
  onUnmountAlert: () => void;
};

const ALERT_DURATION = 5000;

export const Alert = ({ text, type, onUnmountAlert }: AlertProps) => {
  const AlertIcon = type === 'success' ? CheckIcon : CloseIcon;

  const [closeAnimation, setCloseAnimation] = useState(false);

  const closeAlert = useCallback(() => {
    setCloseAnimation(true);
    const timer = setTimeout(() => {
      setCloseAnimation(false);
      onUnmountAlert();
    }, 400);
    return () => clearTimeout(timer);
  }, [onUnmountAlert]);

  useEffect(() => {
    const timer = setTimeout(() => {
      closeAlert();
    }, ALERT_DURATION);
    return () => clearTimeout(timer);
  }, [closeAlert]);

  return (
    <aside
      className={classNames(styles.container, styles[type], closeAnimation && styles.close)}
      data-testid={`${type}-alert`}
      role="alert"
    >
      <div className={styles['icon-container']} aria-hidden="true">
        <CheckIcon className={styles.icon} />
      </div>
      <p className={styles.text}>{text}</p>
      <button
        type="button"
        onClick={closeAlert}
        className={styles['close-toast-container']}
        aria-label="Close alert"
      >
        <AlertIcon className={styles['close-toast']} />
      </button>
    </aside>
  );
};
