import React from "react";
import useHttpBlogPost from "../../../hooks/api/useHttpBlogPost";
import { useSelector } from "../../../store";
import {
  DataGrid,
  ColDef,
  CellParams,
  RowParams,
} from "@material-ui/data-grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { IBlogPost } from "../../../types";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import CustomPopover from "../../../components/Admin/CustomPopover/CustomPopover";
import { useHistory } from "react-router-dom";

export default function Posts() {
  const history = useHistory();
  const blogPostReducer = useSelector((state) => state.blogPostReducer);
  const { isLoading, deleteBlogPost } = useHttpBlogPost({
    isFetchNeeded: true,
  });

  const rows = blogPostReducer.map((post: IBlogPost) => {
    return {
      id: post.id,
      title: post.title,
      category: post.category?.name,
      author: post.author.name,
    };
  });

  const columns: ColDef[] = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 0.1,
      renderCell: (params: CellParams) => {
        return <CustomPopover content={params.value} />;
      },
    },
    { field: "category", headerName: "Category", flex: 0.5 },
    { field: "author", headerName: "Author", flex: 0.5 },
    {
      field: "",
      headerName: "Action",
      flex: 0.2,
      renderCell: (params: CellParams) => {
        return (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => deleteBlogPost(params.row.id)}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        height: "90vh",
        alignItems: `${isLoading ? "center" : ""}`,
        justifyContent: "center",
      }}
    >
      {/*PERFORMANS PROBLEMINDEN DOLAYI ABSOLUTE. 
      https://github.com/mui-org/material-ui-x/issues/799
      */}
      {!isLoading ? (
        <div style={{ width: "85%", position: "absolute", height: "90vh" }}>
          <DataGrid
            onCellClick={(param: CellParams) => {
              if (param.field === "title") {
                const postDetails = blogPostReducer.find(
                  (post: IBlogPost) => post.id === param.row.id
                );
                history.push({
                  pathname: `posts/${param.row.title}`,
                  state: { postDetails, isUpdate: true },
                });
              }
            }}
            rows={rows}
            columns={columns}
            disableSelectionOnClick
          />
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}
