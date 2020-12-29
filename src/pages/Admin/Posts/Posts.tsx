import React from "react";
import useHttpBlogPost from "../../../hooks/api/useHttpBlogPost";
import { useSelector } from "../../../store";
import { DataGrid, ColDef } from "@material-ui/data-grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { IBlogPost } from "../../../types";

const columns: ColDef[] = [
  { field: "title", headerName: "Title", width: 130 },
  { field: "category", headerName: "Category", width: 130 },
];

export default function Posts() {
  const blogPostReducer = useSelector((state) => state.blogPostReducer);
  const { isLoading } = useHttpBlogPost(true);

  const rows = blogPostReducer.map((post: IBlogPost) => {
    return {
      id: post.id,
      title: post.title,
      category: post.categoryId,
    };
  });
  return (
    <div
      style={{
        display: "flex",
        height: "90vh",
        alignItems: `${isLoading ? "center" : ""}`,
        justifyContent: "center",
      }}
    >
      {!isLoading ? (
        <div style={{ width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={25}
            checkboxSelection
          />
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}
