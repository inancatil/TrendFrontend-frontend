import { ILogin, ILoginResponse, LOGIN } from "./types";
import axios from "../../config/axios-config";
import { AxiosResponse } from "axios";
import { AppThunk } from "..";

export const login = (loginData: ILogin): AppThunk => {
  return (dispatch) => {
    axios
      .post("/api/users/login", {
        email: loginData.username,
        password: loginData.password,
      }
      ,{
        headers:{
          "Content-Type":"application/json"
        }
      })
      .then((res: AxiosResponse<ILoginResponse>) => {
        dispatch({
          type: LOGIN,
          payload: {
            userData: res.data.userData,
            token: res.data.token,
          },
        });
      });
  };
};
