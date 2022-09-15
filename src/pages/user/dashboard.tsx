import type { NextPage } from 'next';

import { makeUserDashboard } from '@/main/dependency-injection/pages/dashboard/user-dashboard/user-dashboard-factory';

const UserDashboard: NextPage = () => {
  return makeUserDashboard();
};

export default UserDashboard;
