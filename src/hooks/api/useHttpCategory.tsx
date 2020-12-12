import { AxiosResponse } from "axios";
import { useState, useCallback } from "react";
import axios from "../../config/axios-config";
import {
  ICategory,
  ICreateCategoryResponse,
  IGetAllCategoriesResponse,
} from "../../types";

export default function useHttpCategory() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const addNewCategory = useCallback(async (name: string) => {
    setIsLoading(true);
    let response: ICreateCategoryResponse | null = null;

    try {
      await axios
        .post("/api/categories", {
          name: name,
        })
        .then((res: AxiosResponse<ICreateCategoryResponse | null>) => {
          response = res.data;
          setError("");
        })
        .catch((err) => {
          //Backend tarafındaki custom errors
          console.log(err);
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
    let response: IGetAllCategoriesResponse | null = null;

    try {
      await axios
        .get("/api/categories")
        .then((res: AxiosResponse<IGetAllCategoriesResponse | null>) => {
          response = res.data;
          setError("");
        })
        .catch((err) => {
          //Backend tarafındaki custom errors
          console.log(err);
          //setError(err.response.data.message);
        });
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
    return response;
  }, []);

  return { isLoading, error, addNewCategory, getAllCategories };
}
