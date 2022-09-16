import { useLayoutEffect, useEffect } from 'react';

import { NextHelper } from '@/presentation/helpers/next-helper';

export const useIsomorphicLayoutEffect = NextHelper.isOnClientSide() ? useLayoutEffect : useEffect;
