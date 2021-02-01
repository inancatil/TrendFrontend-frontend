import React, { useMemo, useState } from "react";
import { useHistory } from "react-router";
import useHttpBlogPost from "../../../hooks/api/useHttpBlogPost";
import { IBlogPost } from "../../../types";
import Button from "@material-ui/core/Button";
import AddBoxIcon from "@material-ui/icons/AddBox";
import CustomTable, {
  HeadCell,
} from "../../../components/Admin/CustomTable/CustomTable";
import moment from "moment";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import ConfirmationModal from "../../../components/modal/ConfirmationModal";

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
  const { deleteBlogPost, blogPosts, isLoading } = useHttpBlogPost({
    isFetchNeeded: true,
  });
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deletingPost, setDeletingPost] = useState<IBlogPost>();
  const rows = useMemo(() => {
    const actionButtons = (postId: string) => {
      return (
        <>
          <IconButton
            color="secondary"
            onClick={() => {
              setDeleteModal(true);
              setDeletingPost(
                blogPosts.find((post: IBlogPost) => post.id === postId)
              );
            }}
          >
            <Icon>delete</Icon>
          </IconButton>
          <IconButton
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
            <Icon>create</Icon>
          </IconButton>
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
          date: moment(post.date).format("YYYY-MM-DD"),
          actions: actionButtons(post.id),
        };
      });
    };

    return convertToTableData(blogPosts);
  }, [blogPosts, history]);
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
      {
        <ConfirmationModal
          isOpen={deleteModal}
          setIsOpen={setDeleteModal}
          title={"Are you sure?"}
          message={"Do you want to delete"}
          dynamicMsgPart={deletingPost ? deletingPost!.title : ""}
          confirmAction={() => deleteBlogPost(deletingPost!.id)}
        />
      }
      <CustomTable
        headCells={headCells}
        tableData={rows}
        isLoading={isLoading}
      />
    </>
  );
}
