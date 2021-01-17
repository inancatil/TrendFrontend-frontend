import { IBlogPost } from ".";

export type IRole = "Admin" | "User" | "";

export interface IUser {
  id: string;
  name: string;
  email: string;
  blogPosts: IBlogPost[];
  isLoggedIn: boolean;
  jwtToken: string;
  role: IRole;
}
