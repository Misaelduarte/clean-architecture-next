import { useCallback, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { UserRoles } from '@/domain/models/user-model';

import '@/presentation/styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const userRole = UserRoles.ADMIN;

  const checkIsUserAllowed = useCallback((): boolean => {
    if (router.pathname.startsWith('/admin') && userRole !== UserRoles.ADMIN) {
      return false;
    }

    // if (router.pathname.startsWith('/user') && userRole !== UserRoles.CUSTOMER) {
    //   return false;
    // }

    return true;
  }, [router.pathname, userRole]);

  useEffect(() => {
    if (!checkIsUserAllowed()) {
      router.push('/login');
    }
  }, [checkIsUserAllowed, router]);

  return checkIsUserAllowed() ? <Component {...pageProps} /> : null;
}

export default MyApp;
