import {
  ALERT_CLEAR,
  ALERT_ERROR,
  ALERT_SUCCESS,
  IAlertActions,
} from "./types";

export const alertSuccess = (message: string): IAlertActions => {
  return {
    type: ALERT_SUCCESS,
    message,
  };
};

export const alertError = (message: string): IAlertActions => {
  return {
    type: ALERT_ERROR,
    message,
  };
};

export const alertClear = (): IAlertActions => {
  return {
    type: ALERT_CLEAR,
  };
};
