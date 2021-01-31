import React, { useMemo } from "react";
import { useHistory } from "react-router";
import useHttpBlogPost from "../../../hooks/api/useHttpBlogPost";
import { IBlogPost } from "../../../types";
import Button from "@material-ui/core/Button";
import AddBoxIcon from "@material-ui/icons/AddBox";

import CustomTable, {
  HeadCell,
} from "../../../components/Admin/CustomTable/CustomTable";
import moment from "moment";

const headCells: HeadCell[] = [
  {
    id: "id",
    align: "left",
    label: "Id",
    hidden: true,
  },
  {
    id: "title",
    align: "left",
    label: "Title",
    isSortable: true,
  },
  {
    id: "category",
    align: "left",
    label: "Category",
    isSortable: true,
  },
  {
    id: "tags",
    align: "left",
    label: "Tags",
    isSortable: false,
  },

  {
    id: "date",
    align: "left",
    label: "Date",
    isSortable: true,
  },
  {
    id: "actions",
    align: "right",
    label: "Actions",
    isSortable: false,
  },
];

export default function Posts() {
  const history = useHistory();
  const { deleteBlogPost, blogPosts } = useHttpBlogPost({
    isFetchNeeded: true,
  });

  const rows = useMemo(() => {
    const actionButtons = (postId: string) => {
      return (
        <>
          <Button
            color="secondary"
            variant="contained"
            size="small"
            onClick={() => deleteBlogPost(postId)}
          >
            Delete
          </Button>
          <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={() => {
              const postDetails = blogPosts.find(
                (post: IBlogPost) => post.id === postId
              );
              history.push({
                pathname: `posts/${postDetails!.title}`,
                state: { postDetails, isUpdate: true },
              });
            }}
          >
            Edit
          </Button>
        </>
      );
    };

    const convertToTableData = (data: IBlogPost[]) => {
      //Kontrol et. Birkaç kez çalışıyor.
      if (data.length === 0) return [];
      return data.map((post) => {
        return {
          id: post.id,
          title: post.title,
          category: post.category?.name,
          tags: post.tags.map((t) => t.name),
          date: moment(post.date).format("Do MMM YY"),
          actions: actionButtons(post.id),
        };
      });
    };

    return convertToTableData(blogPosts);
  }, [blogPosts, deleteBlogPost, history]);

  return (
    <>
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
      <CustomTable headCells={headCells} tableData={rows} />
    </>
  );
}
