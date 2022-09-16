import { useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';

type WrapperType = AnimatedScaleProps & {
  style: React.CSSProperties;
};

const WrapperElement = (props: WrapperType) => {
  const { type, children, ...otherProps } = props;

  switch (type) {
    case 'div':
      return <div {...otherProps}>{children}</div>;
    case 'span':
      return <span {...otherProps}>{children}</span>;
    case 'button':
      return <button {...otherProps}>{children}</button>;
    default:
      return <div {...otherProps}>{children}</div>;
  }
};

type AnimatedScaleProps = {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  type?: 'div' | 'span' | 'button';
  animate?: 'in' | 'out';
  className?: string;
  delayOut?: boolean;
  onAnimationEnd?: () => void;
};

let timer: NodeJS.Timeout | null = null;

export const AnimatedScale = ({
  children,
  duration = 300,
  delay = 0,
  type = 'div',
  animate = 'in',
  delayOut = false,
  className,
  onAnimationEnd,
}: AnimatedScaleProps) => {
  // Must set 100vh height initially to prevent animation from jumping to the top
  const [fixedMaxHeight, setFixedMaxHeight] = useState(true);

  const isDelayOut = animate === 'out' && delayOut;

  useEffect(() => {
    let timeout = duration + delay;
    if (animate === 'out' && !isDelayOut) {
      timeout = duration;
    }
    setFixedMaxHeight(true);
    timer = setTimeout(() => {
      setFixedMaxHeight(false);
      onAnimationEnd?.();
    }, timeout);

    // Clear timer on unmount
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [animate, delay, duration, isDelayOut, onAnimationEnd]);

  return (
    <WrapperElement
      type={type}
      style={{
        animationDuration: `${duration}ms`,
        animationDelay: animate === 'out' && !isDelayOut ? undefined : `${delay}ms`,
      }}
      className={classNames(className, styles[`animate-${animate}`], {
        [styles['disable-animation']]: !fixedMaxHeight,
      })}
    >
      {children}
    </WrapperElement>
  );
};
