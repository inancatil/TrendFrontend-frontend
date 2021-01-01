import { AxiosResponse } from "axios";
import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "../../config/axios-config";
import { ICreateBlogPostResponse, IGetAllBlogPostsResponse } from "../../types";
import * as blogPostActions from "../../store/BlogPost/action";

interface INewBlogPost {
  title: string;
  content: string;
  imageUrl: string;
  author: string;
  date: string;
  tags: string[];
  categoryId: string | null;
}

export default function useHttpBlogPost(isFetchNeeded: boolean = false) {
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
            setIsSuccessfull(true);
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
    try {
      await axios
        .get("/api/blogPosts")
        .then((res: AxiosResponse<IGetAllBlogPostsResponse>) => {
          dispatch(blogPostActions.getAllBlogPosts(res.data.blogPosts));
          console.log(res.data.blogPosts);
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
  }, [dispatch]);

  useEffect(() => {
    isFetchNeeded && getAllBlogPosts();
  }, [getAllBlogPosts, isFetchNeeded]);

  return { isLoading, error, addNewBlogPost, getAllBlogPosts, isSuccessfull };
}
