import { UserModel } from '@/domain/models/user-model';

export interface GetUser {
  execute(): Promise<UserModel>;
}
