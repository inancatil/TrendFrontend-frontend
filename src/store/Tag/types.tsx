import { ITag } from "./../../types";
export const CREATE_TAG = "CREATE_TAG";
export const DELETE_TAG = "DELETE_TAG";
export const GET_TAGS = "GET_TAGS";

interface IGetAllTagsAction {
  type: typeof GET_TAGS;
  payload: ITag[];
}
interface ICreateTagAction {
  type: typeof CREATE_TAG;
  payload: ITag;
}

interface IDeleteTagByIdAction {
  type: typeof DELETE_TAG;
  payload: {
    id: string;
  };
}

export type ITagActions =
  | ICreateTagAction
  | IDeleteTagByIdAction
  | IGetAllTagsAction;
