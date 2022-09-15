import { UserRoles } from '@/domain/models/user-model';
import { SIDEBAR_ROUTES_BY_ROLE } from '@/main/constants/routes';

export const Sidebar: React.FC = () => {
  // TODO: Get real user role
  const userRole = UserRoles.ADMIN;

  const renderedRoutes = SIDEBAR_ROUTES_BY_ROLE[userRole];
  console.log(renderedRoutes);

  return <aside></aside>;
};
