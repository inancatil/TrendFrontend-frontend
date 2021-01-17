import { AxiosResponse } from "axios";
import { useState, useCallback, useEffect } from "react";
import axios from "../../config/axios-config";
import {
  ICreateCategoryResponse,
  IGetAllCategoriesResponse,
  IDeleteCategoryResponse,
} from "../../types";
import { ICategory } from "./../../types";

type IProps = {
  isFetchNeeded?: boolean;
};

export default function useHttpCategory(params?: Partial<IProps>) {
  const defaultParams: IProps = {
    isFetchNeeded: false,
    ...params,
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [categories, setCategories] = useState<ICategory[]>([]);

  const getAllCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      await axios
        .get("/api/categories")
        .then((res: AxiosResponse<IGetAllCategoriesResponse>) => {
          setCategories(res.data.categories);
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

  const addNewCategory = useCallback(
    async (name: string) => {
      setIsLoading(true);
      try {
        await axios
          .post("/api/categories", {
            name: name,
          })
          .then((res: AxiosResponse<ICreateCategoryResponse>) => {
            setCategories([...categories, res.data.category]);
            console.log(categories);
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
    [categories]
  );

  const deleteCategoryById = useCallback(
    async (id: string) => {
      setIsLoading(true);
      try {
        await axios
          .delete(`/api/categories/${id}`)
          .then((res: AxiosResponse<IDeleteCategoryResponse>) => {
            const newCategories = [...categories];
            newCategories.splice(
              categories.findIndex((cat) => cat.id === id),
              1
            );
            setCategories(newCategories);
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
    [categories]
  );

  useEffect(() => {
    defaultParams.isFetchNeeded && getAllCategories();
  }, [getAllCategories, defaultParams.isFetchNeeded]);

  return {
    categories,
    isLoading,
    error,
    addNewCategory,
    getAllCategories,
    deleteCategoryById,
  };
}
