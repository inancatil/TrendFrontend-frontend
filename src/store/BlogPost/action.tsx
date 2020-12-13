import { IBlogPost } from "../../types";
import {
  CREATE_BLOG_POST,
  DELETE_BLOG_POST,
  GET_ALL_BLOG_POSTS,
  IBlogPostActions,
} from "./types";

export const createBlogPost = (blogPost: IBlogPost): IBlogPostActions => {
  return {
    type: CREATE_BLOG_POST,
    payload: blogPost,
  };
};

export const deleteBlogPostById = (id: string): IBlogPostActions => {
  return {
    type: DELETE_BLOG_POST,
    payload: { id },
  };
};

export const getAllBlogPosts = (blogPosts: IBlogPost[]): IBlogPostActions => {
  return {
    type: GET_ALL_BLOG_POSTS,
    payload: blogPosts,
  };
};
