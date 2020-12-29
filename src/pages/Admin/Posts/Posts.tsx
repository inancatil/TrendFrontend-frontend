import React, { useEffect } from "react";
import useHttpBlogPost from "../../../hooks/api/useHttpBlogPost";
import { useSelector } from "../../../store";
import { DataGrid, ColDef } from "@material-ui/data-grid";
import { IBlogPost } from "../../../types";

const columns: ColDef[] = [
  { field: "title", headerName: "Title", width: 130 },
  { field: "category", headerName: "Category", width: 130 },
];

export default function Posts() {
  const blogPostReducer = useSelector((state) => state.blogPostReducer);
  const { isLoading } = useHttpBlogPost(true);

  useEffect(() => {
    console.log(blogPostReducer.length);
  });

  const rows = blogPostReducer.map((post: IBlogPost) => {
    return {
      id: post.id,
      title: post.title,
      category: post.categoryId,
    };
  });
  return (
    <>
      {!isLoading ? (
        <div style={{ height: "90vh", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={25}
            checkboxSelection
          />
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}
