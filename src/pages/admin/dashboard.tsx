import type { NextPage } from 'next';

import { makeAdminDashboard } from '@/main/dependency-injection/pages/dashboard/admin-dashboard/admin-dashboard-factory';

const AdminDashboard: NextPage = () => {
  return makeAdminDashboard();
};

export default AdminDashboard;
