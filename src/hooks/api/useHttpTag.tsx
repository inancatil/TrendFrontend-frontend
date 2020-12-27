import { AxiosResponse } from "axios";
import { useState, useCallback } from "react";
import axios from "../../config/axios-config";
import { ITag } from "../../types";
import { useDispatch } from "react-redux";
import * as tagActions from "../../store/Tag/action";
export default function useHttpTag() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const addNewTag = useCallback(async (tags: string[]) => {
    setIsLoading(true);
    let response: ITag | undefined = undefined;

    try {
      await axios
        .post("/api/tags", {
          tags,
        })
        .then((res: AxiosResponse<any>) => {
          response = res.data.category;
          dispatch(tagActions.createTag(response!));
          setError("");
        })
        .catch((err) => {
          //Backend tarafındaki custom errors
          console.log(err.response.data.message);
          //setError(err.response.data.message);
        });
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
    return response;
  }, []);

  const getAllTags = useCallback(async () => {
    setIsLoading(true);
    let response: ITag[] | undefined = undefined;

    try {
      await axios
        .get("/api/tags")
        .then((res: AxiosResponse<any>) => {
          response = res.data.tags;
          dispatch(tagActions.getAllTags(response!));
          setError("");
        })
        .catch((err) => {
          //Backend tarafındaki custom errors
          console.log(err.response);
          //setError(err.response.data.message);
        });
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
    return response;
  }, []);

  const deleteTagById = useCallback(async (id: string) => {
    setIsLoading(true);
    let response: ITag | undefined = undefined;

    try {
      await axios
        .delete(`/api/tags/${id}`)
        .then((res: AxiosResponse<any>) => {
          response = res.data.category;
          dispatch(tagActions.deleteTagById(id));
          setError("");
        })
        .catch((err) => {
          //Backend tarafındaki custom errors
          console.log(err.response);
          //setError(err.response.data.message);
        });
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
    return response;
  }, []);

  return {
    isLoading,
    error,
    addNewTag,
    getAllTags,
    deleteTagById,
  };
}
