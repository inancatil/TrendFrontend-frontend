import { CREATE_TAG, DELETE_TAG, GET_TAGS, ITagActions } from "./types";
import { ITag } from "./../../types";

export const createTag = (tag: ITag): ITagActions => {
  return {
    type: CREATE_TAG,
    payload: tag,
  };
};

export const deleteTagById = (id: string): ITagActions => {
  return {
    type: DELETE_TAG,
    payload: { id },
  };
};

export const getAllTags = (tags: ITag[]): ITagActions => {
  return {
    type: GET_TAGS,
    payload: tags,
  };
};
