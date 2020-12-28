import { AxiosResponse } from "axios";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import axios from "../../config/axios-config";
import {
  IBlogPost,
  ICreateBlogPostResponse,
  IGetAllBlogPostsResponse,
} from "../../types";
import * as blogPostActions from "../../store/BlogPost/action";

export default function useHttpBlogPost() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const addNewBlogPost = useCallback(async (post: Omit<IBlogPost, "id">) => {
    setIsLoading(true);
    try {
      await axios
        .post("/api/blogPosts", {
          ...post,
        })
        .then((res: AxiosResponse<ICreateBlogPostResponse>) => {
          dispatch(blogPostActions.createBlogPost(res.data.blogPost));
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

  const getAllBlogPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      await axios
        .get("/api/blogPosts")
        .then((res: AxiosResponse<IGetAllBlogPostsResponse>) => {
          dispatch(blogPostActions.getAllBlogPosts(res.data.blogPosts));
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

  return { isLoading, error, addNewBlogPost, getAllBlogPosts };
}
