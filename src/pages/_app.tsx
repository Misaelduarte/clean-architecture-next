import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { UserRoles } from '@/domain/models/user-model';

import '@/presentation/styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const userRole = UserRoles.ADMIN;

  function checkIsUserAllowed(): boolean {
    if (router.pathname.startsWith('/admin') && userRole !== UserRoles.ADMIN) {
      return false;
    }

    // if (router.pathname.startsWith('/user') && userRole !== UserRoles.CUSTOMER) {
    //   return false;
    // }

    return true;
  }

  if (!checkIsUserAllowed()) {
    router.push('/login');
  }

  const ComponentToRender = Component;

  return <ComponentToRender {...pageProps} />;
}

export default MyApp;
