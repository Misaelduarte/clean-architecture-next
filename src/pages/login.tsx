import type { NextPage } from 'next';

import { makeLogin } from '@/main/dependency-injection/pages/login/login-factory';

const Login: NextPage = () => {
  return makeLogin();
};

export default Login;
