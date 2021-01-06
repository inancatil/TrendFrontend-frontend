import { AxiosResponse } from "axios";
import { useState, useCallback, useEffect } from "react";
import axios from "../../config/axios-config";
import {
  ICreateCategoryResponse,
  IGetAllCategoriesResponse,
  IDeleteCategoryResponse,
} from "../../types";
import * as categoryActions from "../../store/Category/action";
import { useDispatch } from "react-redux";

type IProps = {
  isFetchNeeded?: boolean;
};

export default function useHttpCategory(params?: Partial<IProps>) {
  const defaultParams: IProps = {
    isFetchNeeded: false,
    ...params,
  };
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const addNewCategory = useCallback(
    async (name: string) => {
      setIsLoading(true);
      try {
        await axios
          .post("/api/categories", {
            name: name,
          })
          .then((res: AxiosResponse<ICreateCategoryResponse>) => {
            dispatch(categoryActions.createCategory(res.data.category));
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

  const getAllCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      await axios
        .get("/api/categories")
        .then((res: AxiosResponse<IGetAllCategoriesResponse>) => {
          dispatch(categoryActions.getAllCategories(res.data.categories));
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

  const deleteCategoryById = useCallback(
    async (id: string) => {
      setIsLoading(true);
      try {
        await axios
          .delete(`/api/categories/${id}`)
          .then((res: AxiosResponse<IDeleteCategoryResponse>) => {
            dispatch(categoryActions.deleteCategoryById(id));
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
    defaultParams.isFetchNeeded && getAllCategories();
  }, [getAllCategories, defaultParams.isFetchNeeded]);

  return {
    isLoading,
    error,
    addNewCategory,
    getAllCategories,
    deleteCategoryById,
  };
}
