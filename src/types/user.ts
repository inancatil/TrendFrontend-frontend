export interface IUser {
  userData: IUserData;
  token: string;
}

export interface IUserData {
  userId: string;
  name: string;
  email: string;
}
