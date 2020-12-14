export const ALERT_ERROR = "ALERT_ERROR";
export const ALERT_SUCCESS = "ALERT_SUCCESS";
export const ALERT_CLEAR = "ALERT_CLEAR";

interface IAlertError {
  type: typeof ALERT_ERROR;
  message: string;
}
interface IAlertSuccess {
  type: typeof ALERT_SUCCESS;
  message: string;
}
interface IAlertClear {
  type: typeof ALERT_CLEAR;
}
export type IAlertActions = IAlertSuccess | IAlertClear | IAlertError;
