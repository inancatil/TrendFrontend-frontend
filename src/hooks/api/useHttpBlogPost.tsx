import { AxiosResponse } from "axios";
import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "../../config/axios-config";
import { ICreateBlogPostResponse, IGetAllBlogPostsResponse } from "../../types";
import * as blogPostActions from "../../store/BlogPost/action";

type IProps = {
  isFetchNeeded?: boolean;
};

interface INewBlogPost {
  title: string;
  content: string;
  imageUrl: string;
  author: string;
  date: string;
  tags: string[];
  categoryId: string | null;
}

export default function useHttpBlogPost(params?: Partial<IProps>) {
  const defaultParams: IProps = {
    isFetchNeeded: false,
    ...params,
  };

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSuccessfull, setIsSuccessfull] = useState(false);

  const addNewBlogPost = useCallback(
    async (post: INewBlogPost) => {
      setIsLoading(true);
      setIsSuccessfull(false);

      try {
        await axios
          .post("/api/blogPosts", {
            ...post,
          })
          .then((res: AxiosResponse<ICreateBlogPostResponse>) => {
            dispatch(blogPostActions.createBlogPost(res.data.blogPost));
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
    [dispatch]
  );

  const getAllBlogPosts = useCallback(async () => {
    setIsLoading(true);
    setIsSuccessfull(false);
    try {
      await axios
        .get("/api/blogPosts")
        .then((res: AxiosResponse<IGetAllBlogPostsResponse>) => {
          dispatch(blogPostActions.getAllBlogPosts(res.data.blogPosts));
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
  }, [dispatch]);

  const updateBlogPost = useCallback(async (id: string, post: INewBlogPost) => {
    setIsLoading(true);
    setIsSuccessfull(false);

    try {
      await axios
        .patch(`/api/blogPosts/${id}`, {
          ...post,
        })
        .then((res: AxiosResponse<ICreateBlogPostResponse>) => {
          //dispatch(blogPostActions.createBlogPost(res.data.blogPost));
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

  const deleteBlogPost = useCallback(async (id: string | number) => {
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
  }, []);

  useEffect(() => {
    defaultParams.isFetchNeeded && getAllBlogPosts();
  }, [getAllBlogPosts, defaultParams.isFetchNeeded]);

  return {
    isLoading,
    error,
    isSuccessfull,
    addNewBlogPost,
    getAllBlogPosts,
    updateBlogPost,
    deleteBlogPost,
  };
}
