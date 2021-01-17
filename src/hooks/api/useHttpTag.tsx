import { AxiosResponse } from "axios";
import { useState, useCallback, useEffect } from "react";
import axios from "../../config/axios-config";
import { ITag } from "./../../types";

type IProps = {
  isFetchNeeded?: boolean;
};

export default function useHttpTag(params?: Partial<IProps>) {
  const defaultParams: IProps = {
    isFetchNeeded: false,
    ...params,
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [tags, setTags] = useState<ITag[]>([]);

  const addNewTag = useCallback(async (tags: string[]) => {
    setIsLoading(true);
    try {
      await axios
        .post("/api/tags", {
          tags,
        })
        .then((res: AxiosResponse<any>) => {})
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
          setTags(res.data.tags);
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
        .then((res: AxiosResponse<any>) => {})
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

  useEffect(() => {
    defaultParams.isFetchNeeded && getAllTags();
  }, [getAllTags, defaultParams.isFetchNeeded]);

  return {
    tags,
    isLoading,
    error,
    addNewTag,
    getAllTags,
    deleteTagById,
  };
}
