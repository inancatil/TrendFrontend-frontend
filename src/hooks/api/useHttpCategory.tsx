import { AxiosResponse } from "axios";
import { useState, useCallback, useEffect } from "react";
import axios from "../../config/axios-config";
import {
  ICreateCategoryResponse,
  IGetAllCategoriesResponse,
  IDeleteCategoryResponse,
} from "../../types";
import useComponentMounted from "../useComponentMounted";
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
  const { isMounted } = useComponentMounted();

  const getAllCategories = useCallback(async () => {
    isMounted && setIsLoading(true);
    try {
      await axios
        .get("/api/categories")
        .then((res: AxiosResponse<IGetAllCategoriesResponse>) => {
          isMounted && setCategories(res.data.categories);
        })
        .catch((err) => {
          //Backend tarafındaki custom errors
          isMounted && setError(err.response.data.message);
        })
        .finally(() => {
          isMounted && setIsLoading(false);
        });
    } catch (err) {
      isMounted && setError("Unknown Error");
      console.log(err);
    }
  }, [isMounted]);

  const addNewCategory = useCallback(
    async (name: string) => {
      isMounted && setIsLoading(true);
      try {
        await axios
          .post("/api/categories", {
            name: name,
          })
          .then((res: AxiosResponse<ICreateCategoryResponse>) => {
            isMounted && setCategories([...categories, res.data.category]);
            console.log(categories);
          })
          .catch((err) => {
            //Backend tarafındaki custom errors
            isMounted && setError(err.response.data.message);
          })
          .finally(() => {
            isMounted && setIsLoading(false);
          });
      } catch (err) {
        setError("Unknown Error");
        console.log(err);
      }
    },
    [categories, isMounted]
  );

  const deleteCategoryById = useCallback(
    async (id: string) => {
      isMounted && setIsLoading(true);
      try {
        await axios
          .delete(`/api/categories/${id}`)
          .then((res: AxiosResponse<IDeleteCategoryResponse>) => {
            const newCategories = [...categories];
            newCategories.splice(
              categories.findIndex((cat) => cat.id === id),
              1
            );
            isMounted && setCategories(newCategories);
          })
          .catch((err) => {
            //Backend tarafındaki custom errors
            isMounted && setError(err.response.data.message);
          })
          .finally(() => {
            isMounted && setIsLoading(false);
          });
      } catch (err) {
        isMounted && setError("Unknown Error");
        console.log(err);
      }
    },
    [categories, isMounted]
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
