import { IBlogPost } from ".";
import { IRole } from "./user";

export interface IAuth {
  jwtToken: string;
}

export interface IAuthResponse {
  id: string;
  name: string;
  email: string;
  blogPosts: IBlogPost[];
  jwtToken: string;
  role: IRole;
}

export interface IAuthResponseError {
  message: string;
}
