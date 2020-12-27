import { CREATE_TAG, DELETE_TAG, GET_TAGS, ITagActions } from "./types";
import { ITag } from "./../../types/tag";

const initialState: ITag[] = [];

const getAllTags = (payload: ITag[]): ITag[] => {
  return payload;
};

const createTag = (state = initialState, payload: ITag): ITag[] => {
  const newState = [...state, payload];
  return newState;
};

const deleteTag = (state = initialState, payload: { id: string }): ITag[] => {
  const newState = state;
  newState.splice(
    newState.findIndex((v) => v.id === payload.id),
    1
  );

  return newState;
};

export const tagReducer = (
  state = initialState,
  action: ITagActions
): ITag[] => {
  switch (action.type) {
    case CREATE_TAG:
      return createTag(state, action.payload);
    case DELETE_TAG:
      return deleteTag(state, action.payload);
    case GET_TAGS:
      return getAllTags(action.payload);
    default:
      return state;
  }
};
