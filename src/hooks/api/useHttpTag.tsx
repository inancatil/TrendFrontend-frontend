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
  }, []);

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
  }, []);

  const deleteTagById = useCallback(async (id: string) => {
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
  }, []);

  return {
    isLoading,
    error,
    addNewTag,
    getAllTags,
    deleteTagById,
  };
}
