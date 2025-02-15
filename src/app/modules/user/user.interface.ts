export enum TRole{
    USER = 'user',
    ADMIN = 'admin'
};
export type TUser = {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword?: string;
  role: TRole;
  isDeleted: boolean;
};
