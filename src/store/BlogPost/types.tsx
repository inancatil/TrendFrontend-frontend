import { IBlogPost } from "../../types";

export const CREATE_BLOG_POST = "CREATE_BLOG_POST";
export const DELETE_BLOG_POST = "DELETE_BLOG_POST";
export const UPDATE_BLOG_POST = "UPDATE_BLOG_POST";
export const GET_ALL_BLOG_POSTS = "GET_ALL_BLOG_POSTS";

interface IGetAllBlogPostsAction {
  type: typeof GET_ALL_BLOG_POSTS;
  payload: IBlogPost[];
}
interface ICreateBlogPostAction {
  type: typeof CREATE_BLOG_POST;
  payload: IBlogPost;
}

interface IDeleteBlogPostByIdAction {
  type: typeof DELETE_BLOG_POST;
  payload: {
    id: string;
  };
}

interface IUpdateBlogPostByIdAction {
  type: typeof UPDATE_BLOG_POST;
  payload: IBlogPost;
}

export type IBlogPostActions =
  | ICreateBlogPostAction
  | IDeleteBlogPostByIdAction
  | IUpdateBlogPostByIdAction
  | IGetAllBlogPostsAction;
