import { AxiosResponse } from "axios";
import { useState, useCallback, useEffect } from "react";
import axios from "../../config/axios-config";
import {
  IBlogPost,
  ICreateBlogPostResponse,
  IGetAllBlogPostsResponse,
} from "../../types";

type IProps = {
  isFetchNeeded?: boolean;
};

interface INewBlogPost {
  title: string;
  content: string;
  imageUrl: string;
  author: string;
  date: Date;
  tags: string[];
  categoryId: string | null;
}

export default function useHttpBlogPost(params?: Partial<IProps>) {
  const defaultParams: IProps = {
    isFetchNeeded: false,
    ...params,
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const [blogPosts, setblogPosts] = useState<IBlogPost[]>([]);

  const addNewBlogPost = useCallback(async (post: INewBlogPost) => {
    setIsLoading(true);
    setIsSuccessfull(false);

    try {
      await axios
        .post("/api/blogPosts", {
          ...post,
        })
        .then((res: AxiosResponse<ICreateBlogPostResponse>) => {
          setIsSuccessfull(res.status === 201);
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
    setIsSuccessfull(false);
    try {
      await axios
        .get("/api/blogPosts")
        .then((res: AxiosResponse<IGetAllBlogPostsResponse>) => {
          setblogPosts(res.data.blogPosts);
          setIsSuccessfull(res.status === 200);
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
    }
  }, []);

  const updateBlogPost = useCallback(async (id: string, post: INewBlogPost) => {
    setIsLoading(true);
    setIsSuccessfull(false);

    try {
      await axios
        .put(`/api/blogPosts/${id}`, {
          ...post,
        })
        .then((res: AxiosResponse<ICreateBlogPostResponse>) => {
          setIsSuccessfull(res.status === 201);
        })
        .catch((err) => {
          //Backend tarafındaki custom errors
          console.log(err.response.data.message);
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

  const deleteBlogPost = useCallback(
    async (id: string | number) => {
      setIsLoading(true);
      setIsSuccessfull(false);

      try {
        await axios
          .delete(`/api/blogPosts/${id}`)
          .then((res: AxiosResponse<ICreateBlogPostResponse>) => {
            //Fetch all posts to update redux.
            //Can be manually done in reducer to decrease api call
            getAllBlogPosts();
            setIsSuccessfull(res.status === 200);
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
    [getAllBlogPosts]
  );

  useEffect(() => {
    defaultParams.isFetchNeeded && getAllBlogPosts();
  }, [getAllBlogPosts, defaultParams.isFetchNeeded]);

  return {
    blogPosts,
    isLoading,
    error,
    isSuccessfull,
    addNewBlogPost,
    getAllBlogPosts,
    updateBlogPost,
    deleteBlogPost,
  };
}
