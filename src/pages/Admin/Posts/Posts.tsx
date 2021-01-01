import React from "react";
import useHttpBlogPost from "../../../hooks/api/useHttpBlogPost";
import { useSelector } from "../../../store";
import { DataGrid, ColDef, CellParams } from "@material-ui/data-grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { IBlogPost } from "../../../types";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import CustomPopover from "../../../components/Admin/CustomPopover/CustomPopover";

const columns: ColDef[] = [
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
        >
          Delete
        </Button>
      );
    },
  },
];

export default function Posts() {
  const blogPostReducer = useSelector((state) => state.blogPostReducer);
  const { isLoading } = useHttpBlogPost(true);

  const rows = blogPostReducer.map((post: IBlogPost) => {
    return {
      id: post.id,
      title: post.title,
      category: post.categoryId?.name,
      author: post.author.name,
    };
  });
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}
