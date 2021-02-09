import { AxiosResponse } from "axios";
import { useState, useCallback, useEffect } from "react";
import axios from "../../config/axios-config";
import {
  IBlogPost,
  ISingleBlogPostResponse,
  IGetAllBlogPostsResponse,
} from "../../types";
import useComponentMounted from "../useComponentMounted";

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
  const { isMounted } = useComponentMounted();
  const [isLoading, setIsLoading] = useState<boolean>(
    params?.isFetchNeeded ? true : false
  );
  const [error, setError] = useState<string>("");
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const [blogPosts, setblogPosts] = useState<IBlogPost[]>([]);
  const [singlePost, setSinglePost] = useState<IBlogPost | null>(null);

  const addNewBlogPost = useCallback(
    async (post: INewBlogPost) => {
      setIsLoading(true);
      setIsSuccessfull(false);

      try {
        await axios
          .post("/api/blogPosts", {
            ...post,
          })
          .then((res: AxiosResponse<ISingleBlogPostResponse>) => {
            isMounted && setIsSuccessfull(res.status === 201);
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
    [isMounted]
  );

  const getAllBlogPosts = useCallback(async () => {
    setIsLoading(true);
    setIsSuccessfull(false);
    try {
      await axios
        .get("/api/blogPosts")
        .then((res: AxiosResponse<IGetAllBlogPostsResponse>) => {
          isMounted && setblogPosts(res.data.blogPosts);
          isMounted && setIsSuccessfull(res.status === 200);
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
    }
  }, [isMounted]);

  const getBlogPostByTitle = useCallback(
    async (title: string) => {
      setIsLoading(true);
      setIsSuccessfull(false);
      try {
        await axios
          .get(`/api/blogPosts/${title}`)
          .then((res: AxiosResponse<ISingleBlogPostResponse>) => {
            isMounted && setSinglePost(res.data.blogPost);
            isMounted && setIsSuccessfull(res.status === 200);
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
      }
    },
    [isMounted]
  );

  const updateBlogPost = useCallback(
    async (id: string, post: INewBlogPost) => {
      setIsLoading(true);
      setIsSuccessfull(false);

      try {
        await axios
          .put(`/api/blogPosts/${id}`, {
            ...post,
          })
          .then((res: AxiosResponse<ISingleBlogPostResponse>) => {
            isMounted && setIsSuccessfull(res.status === 201);
          })
          .catch((err) => {
            //Backend tarafındaki custom errors
            console.log(err.response.data.message);
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
    [isMounted]
  );

  const deleteBlogPost = useCallback(
    async (id: string | number) => {
      setIsLoading(true);
      setIsSuccessfull(false);

      try {
        await axios
          .delete(`/api/blogPosts/${id}`)
          .then((res: AxiosResponse<ISingleBlogPostResponse>) => {
            //Fetch all posts to update redux.
            //Can be manually done in reducer to decrease api call
            res.status === 201 && getAllBlogPosts();
            isMounted && setIsSuccessfull(res.status === 201);
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
    [getAllBlogPosts, isMounted]
  );

  useEffect(() => {
    defaultParams.isFetchNeeded && getAllBlogPosts();
  }, [getAllBlogPosts, defaultParams.isFetchNeeded]);

  return {
    singlePost,
    blogPosts,
    isLoading,
    error,
    isSuccessfull,
    addNewBlogPost,
    getAllBlogPosts,
    updateBlogPost,
    deleteBlogPost,
    getBlogPostByTitle,
  };
}
