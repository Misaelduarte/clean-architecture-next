import { useEffect, useState } from 'react';

import breakpoints from '@/presentation/styles/breakpoints.module.scss';

export const useBreakpoints = () => {
  const [width, setWidth] = useState(0);

  const isSm = width >= parseInt(breakpoints.screenSmMin);
  const isMd = width >= parseInt(breakpoints.screenMdMin);
  const isLg = width >= parseInt(breakpoints.screenLgMin);
  const isXl = width >= parseInt(breakpoints.screenXlMin);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isSm,
    isMd,
    isLg,
    isXl,
  };
};
