import { AxiosResponse } from "axios";
import { useState, useCallback } from "react";
import axios from "../../config/axios-config";
import {
  ICategory,
  ICreateCategoryResponse,
  IGetAllCategoriesResponse,
  IDeleteCategoryResponse,
} from "../../types";
import * as categoryActions from "../../store/Category/action";
import { useDispatch } from "react-redux";

export default function useHttpCategory() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const addNewCategory = useCallback(async (name: string) => {
    setIsLoading(true);
    let response: ICategory | undefined = undefined;

    try {
      await axios
        .post("/api/categories", {
          name: name,
        })
        .then((res: AxiosResponse<ICreateCategoryResponse | null>) => {
          response = res.data?.category;
          dispatch(categoryActions.createCategory(response!));
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

  const getAllCategories = useCallback(async () => {
    setIsLoading(true);
    let response: ICategory[] | undefined = undefined;

    try {
      await axios
        .get("/api/categories")
        .then((res: AxiosResponse<IGetAllCategoriesResponse | undefined>) => {
          response = res.data?.categories;
          dispatch(categoryActions.getAllCategories(response!));
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

  const deleteCategoryById = useCallback(async (id: string) => {
    setIsLoading(true);
    let response: ICategory | undefined = undefined;

    try {
      await axios
        .delete(`/api/categories/${id}`)
        .then((res: AxiosResponse<IDeleteCategoryResponse | undefined>) => {
          response = res.data?.category;
          dispatch(categoryActions.deleteCategoryById(id));
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
    addNewCategory,
    getAllCategories,
    deleteCategoryById,
  };
}
