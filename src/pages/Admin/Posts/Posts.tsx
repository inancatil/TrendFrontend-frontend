import React from "react";
import useHttpBlogPost from "../../../hooks/api/useHttpBlogPost";
import { useSelector } from "../../../store";
import { DataGrid, ColDef, CellParams } from "@material-ui/data-grid";
import { IBlogPost } from "../../../types";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import CustomPopover from "../../../components/Admin/CustomPopover/CustomPopover";
import { useHistory } from "react-router-dom";
import { Chip, createStyles, makeStyles, Theme } from "@material-ui/core";
import { getRandomColor } from "../../../tools/utils";
import AddBoxIcon from "@material-ui/icons/AddBox";

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
      width: 90,
      renderCell: (params: CellParams) => {
        return <CustomPopover content={params.value} />;
      },
    },
    { field: "category", headerName: "Category", width: 90 },
    {
      field: "tags",
      headerName: "Tag",
      width: 300,

      sortable: false,
      renderCell: (params: CellParams) => {
        return (
          <div className={classes.chip}>
            {params.row.tags.map((t: string, i: number) => (
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
      width: 150,
      disableColumnMenu: true,
      sortable: false,
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
    <div style={{ width: "100%", height: "90vh" }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddBoxIcon />}
        onClick={() => {
          history.push({
            pathname: `posts/newpost`,
            state: { isUpdate: false },
          });
        }}
      >
        Add New
      </Button>
      <DataGrid
        rowHeight={65}
        loading={isLoading}
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
      />
    </div>
  );
}
