import { ICategory } from "../../types";

export const CREATE_CATEGORY = "CREATE_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";

interface IGetAllCategoriesAction {
  type: typeof GET_ALL_CATEGORIES;
  payload: ICategory[];
}
interface ICreateCategoryAction {
  type: typeof CREATE_CATEGORY;
  payload: ICategory;
}

interface IDeleteCategoryByIdAction {
  type: typeof DELETE_CATEGORY;
  payload: {
    id: string;
  };
}

interface IUpdateCategoryAction {
  type: typeof UPDATE_CATEGORY;
  payload: ICategory;
}

export type ICategoryActions =
  | ICreateCategoryAction
  | IDeleteCategoryByIdAction
  | IUpdateCategoryAction
  | IGetAllCategoriesAction;
