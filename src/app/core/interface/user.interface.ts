export interface IUser {
  id?: string;
  name: string;
  username: string;
  userType: number | boolean;
  email: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}
