import type { NextPage } from 'next';
import Head from 'next/head';

import { makeLogin } from '@/main/di/pages/login/login-factory';

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login | FFA</title>
      </Head>

      {makeLogin()}
    </>
  );
};

export default Login;
