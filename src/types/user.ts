import { IBlogPost } from ".";

export interface IUser {
  id: string;
  name: string;
  email: string;
  blogPosts: IBlogPost[];
}