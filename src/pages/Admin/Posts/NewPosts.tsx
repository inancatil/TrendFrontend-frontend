import React, { useMemo } from "react";
import { useHistory } from "react-router";
import useHttpBlogPost from "../../../hooks/api/useHttpBlogPost";
import { IBlogPost } from "../../../types";
import Button from "@material-ui/core/Button";
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

export default function NewPosts() {
  const history = useHistory();
  const { isLoading, deleteBlogPost, blogPosts } = useHttpBlogPost({
    isFetchNeeded: true,
  });

  const actionButtons = (params: any) => {
    return (
      <>
        <Button color="primary" onClick={() => console.log(params)}>
          Delete
        </Button>
        <Button color="primary" onClick={() => console.log(params)}>
          Edit
        </Button>
      </>
    );
  };

  const rows = useMemo(() => {
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
  }, [blogPosts]);

  return <CustomTable headCells={headCells} tableData={rows} />;
}
