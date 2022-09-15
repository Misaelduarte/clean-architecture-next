import type { NextPage } from 'next';

import { makeHome } from '@/main/dependency-injection/pages/home/home-factory';

const Home: NextPage = () => {
  return makeHome();
};

export default Home;
