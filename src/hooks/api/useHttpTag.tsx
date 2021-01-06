import { AxiosResponse } from "axios";
import { useState, useCallback, useEffect } from "react";
import axios from "../../config/axios-config";
import { useDispatch } from "react-redux";
import * as tagActions from "../../store/Tag/action";

type IProps = {
  isFetchNeeded?: boolean;
};

export default function useHttpTag(params?: Partial<IProps>) {
  const defaultParams: IProps = {
    isFetchNeeded: false,
    ...params,
  };
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const addNewTag = useCallback(
    async (tags: string[]) => {
      setIsLoading(true);
      try {
        await axios
          .post("/api/tags", {
            tags,
          })
          .then((res: AxiosResponse<any>) => {
            dispatch(tagActions.createTag(res.data.category));
          })
          .catch((err) => {
            //Backend tarafındaki custom errors
            setError(err.response.data.message);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (err) {
        setError("Unknown Error");
        console.log(err);
      }
    },
    [dispatch]
  );

  const getAllTags = useCallback(async () => {
    setIsLoading(true);
    try {
      await axios
        .get("/api/tags")
        .then((res: AxiosResponse<any>) => {
          dispatch(tagActions.getAllTags(res.data.tags));
        })
        .catch((err) => {
          //Backend tarafındaki custom errors
          setError(err.response.data.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (err) {
      setError("Unknown Error");
      console.log(err);
    }
  }, [dispatch]);

  const deleteTagById = useCallback(
    async (id: string) => {
      setIsLoading(true);
      try {
        await axios
          .delete(`/api/tags/${id}`)
          .then((res: AxiosResponse<any>) => {
            dispatch(tagActions.deleteTagById(id));
          })
          .catch((err) => {
            //Backend tarafındaki custom errors
            setError(err.response.data.message);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (err) {
        setError("Unknown Error");
        console.log(err);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    defaultParams.isFetchNeeded && getAllTags();
  }, [getAllTags, defaultParams.isFetchNeeded]);

  return {
    isLoading,
    error,
    addNewTag,
    getAllTags,
    deleteTagById,
  };
}
