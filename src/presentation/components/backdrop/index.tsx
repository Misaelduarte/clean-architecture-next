import { useCallback, useEffect } from 'react';
import classNames from 'classnames';

import { ScrollHelper } from '@/presentation/helpers/scroll-helper';

import styles from './styles.module.scss';

type BackdropProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export const Backdrop = ({ className, children, onClick }: BackdropProps) => {
  const onBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (event.currentTarget !== event.target) {
        return;
      }
      onClick?.();
    },
    [onClick]
  );

  useEffect(() => {
    ScrollHelper.disableScroll();
    return () => {
      ScrollHelper.enableScroll();
    };
  }, []);

  useEffect(() => {
    const callOnClickOnEscPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClick?.();
      }
    };

    document.addEventListener('keydown', callOnClickOnEscPress, false);
    return () => {
      document.removeEventListener('keydown', callOnClickOnEscPress, false);
    };
  }, [onClick]);

  return (
    <div
      className={classNames(className, styles.backdrop, { [styles.clickable]: !!onClick })}
      onClick={onBackdropClick}
      role="presentation"
    >
      {children}
    </div>
  );
};
