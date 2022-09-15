export enum UserRoles {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

export type UserModel = {
  name: string;
  email: string;
  role: UserRoles;
};
