import { ICategory } from "../../types";
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  GET_ALL_CATEGORIES,
  ICategoryActions,
} from "./types";

export const createCategory = (id: string, name: string): ICategoryActions => {
  const category: ICategory = {
    id,
    name,
    blogPosts: [],
  };
  return {
    type: CREATE_CATEGORY,
    payload: category,
  };
};

export const deleteCategoryById = (id: string): ICategoryActions => {
  return {
    type: DELETE_CATEGORY,
    payload: { id },
  };
};

export const getAllCategories = (categories: ICategory[]): ICategoryActions => {
  return {
    type: GET_ALL_CATEGORIES,
    payload: categories,
  };
};
