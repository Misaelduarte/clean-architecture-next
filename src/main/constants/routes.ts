import { UserRoles } from '@/domain/models/user-model';

type Route = {
  title: string;
  href: string;
};

const APP_ROUTES = {
  LOGIN: {
    title: 'login',
    href: '/login',
  },
  HOME: {
    title: 'home',
    href: '/home',
  },
  FAQ: {
    title: 'faq',
    href: '/faq',
  },
  CREATE_CONTEST: {
    title: 'create contest',
    href: '/create-contest',
  },
};

export const UNAUTHENTICATED_ROUTES = {
  LOGIN: APP_ROUTES.LOGIN,
};

export const ADMIN_ROUTES = {
  HOME: APP_ROUTES.HOME,
  FAQ: APP_ROUTES.FAQ,
  CREATE_CONTEST: APP_ROUTES.CREATE_CONTEST,
};

export const CUSTOMER_ROUTES = {
  HOME: APP_ROUTES.HOME,
  FAQ: APP_ROUTES.FAQ,
};

export const SIDEBAR_ROUTES_BY_ROLE: Record<UserRoles, Route[]> = {
  [UserRoles.ADMIN]: [ADMIN_ROUTES.HOME, ADMIN_ROUTES.FAQ],
  [UserRoles.CUSTOMER]: [CUSTOMER_ROUTES.HOME, CUSTOMER_ROUTES.FAQ],
};
