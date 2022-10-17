import type { NextPage } from 'next';

import { makeUserDashboard } from '@/main/di/pages/dashboard/user-dashboard/user-dashboard-factory';

const UserDashboard: NextPage = () => {
  return makeUserDashboard();
};

export default UserDashboard;