import { AxiosResponse } from "axios";
import { useState, useCallback } from "react";
import axios from "../../config/axios-config";
import {
  IBlogPost,
  ICreateBlogPostResponse,
  IGetAllBlogPostsResponse,
} from "../../types";

export default function useHttpBlogPost() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  /* Omit<IBlogPost, "id"> 
  id prop unu interfaceten çıkarıp öyle type check yapar
  */
  const addNewBlogPost = useCallback(async (post: Omit<IBlogPost, "id">) => {
    setIsLoading(true);
    let response: ICreateBlogPostResponse | null = null;

    try {
      await axios
        .post("/api/blogPosts", {
          ...post,
        })
        .then((res: AxiosResponse<ICreateBlogPostResponse>) => {
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


  const getAllBlogPosts = useCallback(async () => {
    setIsLoading(true);
    let response: IGetAllBlogPostsResponse | null = null;
    try {
      await axios
        .get("/api/blogPosts")
        .then((res: AxiosResponse<IGetAllBlogPostsResponse>) => {
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

  return { isLoading, error, addNewBlogPost, getAllBlogPosts };
}
