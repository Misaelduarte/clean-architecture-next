export const API_URL = process.env.NEXT_PUBLIC_APP_API_URL as string;
export const ROOT_DOMAIN = process.env.NEXT_PUBLIC_APP_ROOT_DOMAIN as string;
export const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT as string;
export const IS_DEV_ENV = ENVIRONMENT === 'development';
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;
