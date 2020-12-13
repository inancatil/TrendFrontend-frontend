import { IUser } from "./user";

export interface IAuth {
    userId: string;
    token: string;
    isLoggedIn: boolean;
}

export interface IAuthResponse {
    userData: IUser,
    authData: Omit<IAuth, "isLoggedIn">,
}