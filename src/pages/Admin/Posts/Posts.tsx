import React, { useEffect, useState } from "react";
import useHttpBlogPost from "../../../hooks/api/useHttpBlogPost";
import { IBlogPost } from "../../../types";
import CarbonFrame from "./CarbonFrame";
//const CarbonFrame = React.lazy(() => import("./CarbonFrame"));

export default function Posts() {
  const [allPostState, setAllPostState] = useState<IBlogPost[]>([])
  const data = useHttpBlogPost();

  useEffect(() => {
    data.getAllBlogPosts().then((res: any) => {
      setAllPostState(res.blogPosts)
      console.log("succ" + JSON.stringify(res.blogPosts))
    }).catch((err) => {
      console.log("err")
    }).finally(() => {
      console.log("finally")
    });
  }, [])

  return (
    <div>
    </div>
  );
}
