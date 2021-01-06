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
import { Chip, createStyles, makeStyles, Theme } from "@material-ui/core";
import { getRandomColor } from "../../../tools/utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.5),
      },
    },
  })
);

export default function Posts() {
  const classes = useStyles();
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
      tags: post.tags.map((p) => p.name),
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
    {
      field: "tags",
      headerName: "Tag",
      flex: 0.5,
      renderCell: (params: CellParams) => {
        return (
          <div className={classes.chip}>
            {params.row.tags.map((t, i) => (
              <Chip
                key={i}
                label={t}
                size="small"
                style={{
                  backgroundColor: getRandomColor(),
                }}
              />
            ))}
          </div>
        );
      },
    },
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
