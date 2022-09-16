import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import FocusTrap from 'focus-trap-react';

import CloseIcon from '@/presentation/assets/svgs/close-icon.svg';
import { AnimatedScale } from '@/presentation/components/animated/animated-scale';
import { Backdrop } from '@/presentation/components/backdrop';
import { useIsomorphicLayoutEffect } from '@/presentation/hooks/use-isomorphic-layout-effect';

import styles from './styles.module.scss';

type ModalProps = {
  title?: string | JSX.Element;
  children: React.ReactNode;
  requestModalClose: boolean;
  onClose: () => void;
  size?: 'large' | 'default' | 'small';
  closeable?: boolean;
};

export const Modal = ({
  title,
  children,
  size = 'default',
  requestModalClose,
  onClose,
  closeable = true,
}: ModalProps) => {
  const [animationType, setAnimationType] = useState<'in' | 'out'>('in');
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const onRequestClose = useCallback(() => {
    if (hasLoaded) {
      setAnimationType('out');
    }
  }, [hasLoaded]);

  const onAnimationEnd = useCallback(() => {
    setHasLoaded(true);
    if (animationType === 'out') {
      onClose();
    }
  }, [animationType, onClose]);

  useEffect(() => {
    if (requestModalClose) {
      onRequestClose();
    }
  }, [onRequestClose, requestModalClose]);

  useEffect(() => {
    const requestCloseOnEscPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeable) {
        onRequestClose?.();
      }
    };

    document.addEventListener('keydown', requestCloseOnEscPress, false);
    return () => {
      document.removeEventListener('keydown', requestCloseOnEscPress, false);
    };
  }, [closeable, onRequestClose]);

  useIsomorphicLayoutEffect(() => {
    setAnimationType('in');
  }, []);

  const renderTitle = useMemo(() => {
    if (typeof title === 'string') {
      return <h2 className={styles.title}>{title}</h2>;
    }
    return title;
  }, [title]);

  const renderModal = useMemo(() => {
    return (
      <FocusTrap
        focusTrapOptions={{
          clickOutsideDeactivates: true,
          fallbackFocus: containerRef?.current || document.body,
        }}
      >
        <div
          ref={containerRef}
          role="dialog"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          aria-modal="true"
          className={classNames(styles['modal-content'], styles[size])}
          data-testid="modal"
          tabIndex={-1}
        >
          {closeable && (
            <button
              className={styles['close-button']}
              type="button"
              onClick={closeable ? onRequestClose : undefined}
            >
              Close
              <CloseIcon className={styles['close-icon']} />
            </button>
          )}
          {title && (
            <div className={styles['modal-header']} id="modal-title">
              {renderTitle}
            </div>
          )}
          <div className={styles['modal-body']} id="modal-description">
            {children}
          </div>
        </div>
      </FocusTrap>
    );
  }, [children, closeable, onRequestClose, renderTitle, size, title]);

  return (
    <Backdrop className={styles.backdrop} onClick={closeable ? onRequestClose : undefined}>
      <AnimatedScale
        className={styles.modal}
        delay={300}
        animate={animationType}
        onAnimationEnd={onAnimationEnd}
      >
        {renderModal}
      </AnimatedScale>
    </Backdrop>
  );
};
