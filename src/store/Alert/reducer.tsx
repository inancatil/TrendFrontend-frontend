import { IAlert } from "../../types";
import {
  ALERT_CLEAR,
  ALERT_ERROR,
  ALERT_SUCCESS,
  IAlertActions,
} from "./types";

const initialState: IAlert = {
  message: "",
};

export const alertReducer = (
  state = initialState,
  action: IAlertActions
): IAlert => {
  switch (action.type) {
    case ALERT_SUCCESS:
      return { message: action.message };
    case ALERT_ERROR:
      return { message: action.message };
    case ALERT_CLEAR:
      return { message: "" };
    default:
      return state;
  }
};
