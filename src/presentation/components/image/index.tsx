/* eslint-disable @next/next/no-img-element */
import { CSSProperties } from 'react';
import { StaticImageData } from 'next/image';
import { Picture } from 'react-optimized-images';

import { IS_DEV_ENV } from '@/main/config/environment';

type ImageProps = {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  objectFit?: CSSProperties['objectFit'];
  className?: string;
  style?: CSSProperties;
  lazy?: boolean;
  optimized?: boolean;
  onClick?: () => void;
};

export const Image = ({
  src,
  width,
  height,
  objectFit = 'contain',
  className,
  style,
  onClick,
  lazy = false,
  optimized = true,
  alt,
}: ImageProps) => {
  const getSrc = (): string => {
    if (typeof src === 'string') {
      return src;
    } else {
      return src.src;
    }
  };

  const otherProps = {
    className,
    width,
    height,
    onClick,
    style: {
      maxWidth: '100%',
      maxHeight: '100%',
      ...style,
      objectFit,
    },
  };

  // Use regular image in dev env as the webp are generated only in production build
  if (IS_DEV_ENV || !optimized) {
    return <img src={getSrc()} loading={lazy ? 'lazy' : undefined} alt={alt} {...otherProps} />;
  }
  return <Picture src={getSrc()} lazy={lazy} alt={alt} {...otherProps} />;
};
