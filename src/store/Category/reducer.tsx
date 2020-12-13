import { ICategory } from "../../types";
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  GET_ALL_CATEGORIES,
  ICategoryActions,
} from "./types";

const initialState: ICategory[] = [];

const getAllCategories = (payload: ICategory[]): ICategory[] => {
  return payload;
};

const createCategory = (
  state = initialState,
  payload: ICategory
): ICategory[] => {
  const newState = [...state, payload];
  return newState;
};

const deleteCategory = (
  state = initialState,
  payload: { id: string }
): ICategory[] => {
  const newState = state;
  newState.splice(
    newState.findIndex((v) => v.id === payload.id),
    1
  );

  return newState;
};

export const categoryReducer = (
  state = initialState,
  action: ICategoryActions
): ICategory[] => {
  switch (action.type) {
    case CREATE_CATEGORY:
      return createCategory(state, action.payload);
    case DELETE_CATEGORY:
      return deleteCategory(state, action.payload);
    case GET_ALL_CATEGORIES:
      return getAllCategories(action.payload);
    default:
      return state;
  }
};
