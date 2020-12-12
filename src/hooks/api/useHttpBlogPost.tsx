import { AxiosResponse } from "axios";
import { useState, useCallback } from "react";
import axios from "../../config/axios-config";

interface IBlogPost {
  title: string;
  content: string;
  imageUrl: string;
  author: string;
  date: string;
  tags: string[];
  categoryId: string;
}
export default function useHttpBlogPost() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const addNewBlogPost = useCallback(async (post: IBlogPost) => {
    setIsLoading(true);
    let response = null;

    try {
      await axios
        .post("/api/blogPosts", {
          ...post,
        })
        .then((res: AxiosResponse<any>) => {
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

  //   const getAllCategories = useCallback(async () => {
  //     setIsLoading(true);
  //     let response = null;

  //     try {
  //       await axios
  //         .get("/api/categories")
  //         .then((res: AxiosResponse<any>) => {
  //           response = res.data;
  //           setError("");
  //         })
  //         .catch((err) => {
  //           //Backend tarafındaki custom errors
  //           console.log(err);
  //           //setError(err.response.data.message);
  //         });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //     setIsLoading(false);
  //     return response;
  //   }, []);

  return { isLoading, error, addNewBlogPost };
}
