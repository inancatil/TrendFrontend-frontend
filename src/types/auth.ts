import { IBlogPost } from ".";
import { IUser } from "./user";

export interface IAuth {
    jwtToken: string;
}

export interface IAuthResponse {
    id: string;
    name: string;
    email: string;
    blogPosts: IBlogPost[];
    jwtToken: string
}

export interface IAuthResponseError {
    message: string
}