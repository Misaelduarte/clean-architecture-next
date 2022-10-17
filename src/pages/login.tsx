import type { NextPage } from 'next';

import { makeLogin } from '@/main/di/pages/login/login-factory';

const Login: NextPage = () => {
  return makeLogin();
};

export default Login;
