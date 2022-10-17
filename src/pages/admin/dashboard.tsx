import type { NextPage } from 'next';

import { makeAdminDashboard } from '@/main/di/pages/dashboard/admin-dashboard/admin-dashboard-factory';

const AdminDashboard: NextPage = () => {
  return makeAdminDashboard();
};

export default AdminDashboard;
