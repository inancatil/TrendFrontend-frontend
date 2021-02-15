import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import axios from "../../config/axios-config";
import { IAuthResponse } from "../../types/auth";
import { useDispatch } from "react-redux";
import * as userActions from "../../store/User/action";
import { useSelector } from "../../store";
import { LOGOUT } from "../../store/User/types";
import { IUser } from "../../types";
import useComponentMounted from "../useComponentMounted";

type IProps = {
  isFetchNeeded?: boolean;
};

export default function useHttpAuth(params?: Partial<IProps>) {
  const defaultParams: IProps = {
    isFetchNeeded: false,
    ...params,
  };

  const { isLoggedIn } = useSelector((state) => state.userReducer);
  const [isLoading, setIsLoading] = useState<boolean>(
    params?.isFetchNeeded ? true : false
  );
  const [error, setError] = useState<string[]>([]);
  const dispatch = useDispatch();
  const { isMounted } = useComponentMounted();
  const [allUsers, setAllUsers] = useState<
    Omit<IUser, "isLoggedIn" | "jwtToken">[]
  >([]);

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);

      try {
        await axios
          .post("/api/users/authenticate", {
            email,
            password,
          })
          .then((res: AxiosResponse<IAuthResponse>) => {
            isMounted && dispatch(userActions.login(res.data));
          })
          .catch((err) => {
            console.log(err);
            setError(err.response.data.error.messages);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (err) {
        setError(["Unknown Error"]);
      }
    },
    [dispatch, isMounted]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);

    try {
      await axios
        .post("/api/users/revoke-token")
        .then((res: AxiosResponse<any>) => {
          isMounted && dispatch(userActions.logout());
        })
        .catch((err) => {
          //Backend tarafındaki custom errors
          setError(err.response.data.error.messages);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (err) {
      setError(["Unknown Error"]);
    }
  }, [dispatch, isMounted]);

  const refreshToken = useCallback(async () => {
    try {
      await axios
        .post("/api/users/refresh-token")
        .then((res: AxiosResponse<IAuthResponse>) => {
          dispatch(userActions.login(res.data));
        })
        .catch((err) => {
          //Backend tarafındaki custom errors
          setError(err.response.data.error.messages);
          dispatch({
            type: LOGOUT,
          });
        });
    } catch (err) {
      setError(["Unknown Error"]);
      dispatch({
        type: LOGOUT,
      });
    }
  }, [dispatch]);

  const getAllUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      await axios
        .get("/api/users")
        .then((res: AxiosResponse<any>) => {
          isMounted && setAllUsers(res.data);
        })
        .catch((err) => {
          //Backend tarafındaki custom errors
          isMounted && setError(err.response.data.error.messages);
        })
        .finally(() => {
          isMounted && setIsLoading(false);
        });
    } catch (err) {
      isMounted && setError(["Unknown Error"]);
      console.log("Unknown Error");
    }
  }, [isMounted]);

  const createNewUser = useCallback(
    async (name: string, email: string, password: string, role: string) => {
      setIsLoading(true);
      try {
        await axios
          .post("/api/users/create-user", { name, email, password, role })
          .then((res: AxiosResponse<any>) => {
            console.log(res.data);
            isMounted && getAllUsers();
          })
          .catch((err) => {
            //Backend tarafındaki custom errors
            setError(err.response.data.error.messages);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (err) {
        setError(["Unknown Error"]);
        console.log("Unknown Error");
      }
    },
    [getAllUsers, isMounted]
  );

  useEffect(() => {
    defaultParams.isFetchNeeded && getAllUsers();
  }, [defaultParams.isFetchNeeded, getAllUsers]);

  return {
    login,
    logout,
    refreshToken,
    isLoggedIn,
    error,
    isLoading,
    createNewUser,
    getAllUsers,
    allUsers,
  };
}
