import { IUser } from '../interface/user.interface';

export class UserModel implements IUser {
  id: string = '';
  name: string = '';
  username: string = '';
  userType: number | boolean = false;
  email: string = '';
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}
