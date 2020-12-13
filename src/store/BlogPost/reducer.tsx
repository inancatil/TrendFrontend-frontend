import { IBlogPost } from "../../types";
import {
  CREATE_BLOG_POST,
  DELETE_BLOG_POST,
  GET_ALL_BLOG_POSTS,
  IBlogPostActions,
} from "./types";

const initialState: IBlogPost[] = [];

const getAllBlogPosts = (payload: IBlogPost[]): IBlogPost[] => {
  return payload;
};

const createBlogPost = (
  state = initialState,
  payload: IBlogPost
): IBlogPost[] => {
  const newState = [...state, payload];
  return newState;
};

const deleteBlogPost = (
  state = initialState,
  payload: { id: string }
): IBlogPost[] => {
  const newState = state;
  newState.splice(
    newState.findIndex((v) => v.id === payload.id),
    1
  );

  return newState;
};

export const blogPostReducer = (
  state = initialState,
  action: IBlogPostActions
): IBlogPost[] => {
  switch (action.type) {
    case CREATE_BLOG_POST:
      return createBlogPost(state, action.payload);
    case DELETE_BLOG_POST:
      return deleteBlogPost(state, action.payload);
    case GET_ALL_BLOG_POSTS:
      return getAllBlogPosts(action.payload);
    default:
      return state;
  }
};
