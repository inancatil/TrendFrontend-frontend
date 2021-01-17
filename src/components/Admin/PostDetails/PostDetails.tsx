import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ProcessButton from "../../../components/Admin/ProcessButton/ProcessButton";
import TextEditor from "../../../components/Admin/TextEditor/TextEditor";
import useHttpBlogPost from "../../../hooks/api/useHttpBlogPost";
import useHttpCategory from "../../../hooks/api/useHttpCategory";
import { useSelector } from "../../../store";
import { IBlogPost } from "../../../types";
import useHttpTag from "./../../../hooks/api/useHttpTag";
import CustomCreatableSelect from "./CustomCreatableSelect";
import { useHistory, useLocation } from "react-router-dom";
import { ICategory } from "./../../../types/category";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function PostDetails() {
  const history = useHistory();
  const classes = useStyles();
  const { state: routerState } = useLocation<any>();
  const {
    addNewBlogPost,
    updateBlogPost,
    isSuccessfull,
    isLoading: blogPostIsLoading,
  } = useHttpBlogPost();
  const userReducer = useSelector((state) => state.userReducer);
  const { isLoading: catIsLoading, categories } = useHttpCategory({
    isFetchNeeded: true,
  });
  const { isLoading: tagIsLoading, tags } = useHttpTag({ isFetchNeeded: true });

  const postDetails: IBlogPost = routerState.postDetails;
  const [selectedTags, setSelectedTags] = useState<any[]>(
    !routerState.isUpdate
      ? []
      : postDetails!.tags.map((t) => {
          return {
            id: t.id,
            value: t.name,
            isNew: false,
          };
        })
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    !routerState.isUpdate
      ? ""
      : postDetails!.category
      ? postDetails!.category.id
      : ""
  );
  const [editorContent, setEditorContent] = useState(
    !routerState.isUpdate ? "" : postDetails.content
  );
  const [title, setTitle] = useState(
    !routerState.isUpdate ? "" : postDetails.title
  );

  const onSubmit = () => {
    if (!routerState.isUpdate) {
      addNewBlogPost({
        title: title,
        content: editorContent.replaceAll("\u200B", ""),
        imageUrl: "imgurl",
        author: userReducer.id,
        date: new Date(),
        tags: selectedTags,
        categoryId: selectedCategoryId,
      });
    } else {
      updateBlogPost(postDetails.id, {
        title: title,
        content: editorContent.replaceAll("\u200B", ""),
        imageUrl: "imgurl",
        author: userReducer.id,
        date: new Date(),
        tags: selectedTags,
        categoryId: selectedCategoryId,
      });
    }
  };

  useEffect(() => {
    if (isSuccessfull) {
      setSelectedTags([]);
      setSelectedCategoryId("");
      setEditorContent("");
      setTitle("");
      history.push("/admin/posts");
    }
  }, [history, isSuccessfull]);

  return (
    <>
      {
        <form className={classes.root} noValidate autoComplete="off">
          <FormControl
            fullWidth
            variant="outlined"
            className={classes.formControl}
          >
            <TextField
              id="outlined-full-width"
              label="Title"
              fullWidth
              margin="normal"
              variant="outlined"
              value={title}
              onChange={(v) => setTitle(v.currentTarget.value)}
            />
          </FormControl>

          {!catIsLoading && categories.length > 0 && (
            <FormControl
              fullWidth
              variant="outlined"
              className={classes.formControl}
            >
              <InputLabel>Categories</InputLabel>
              <Select
                onChange={(e) =>
                  setSelectedCategoryId(e.target.value as string)
                }
                label="Categories"
                value={selectedCategoryId!}
              >
                {categories.map((category: ICategory) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {!tagIsLoading && (
            <FormControl fullWidth className={classes.formControl}>
              <CustomCreatableSelect
                allTags={tags}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
              />
            </FormControl>
          )}

          <FormControl fullWidth className={classes.formControl}>
            <TextEditor
              editorContent={editorContent}
              setEditorContent={setEditorContent}
            />
          </FormControl>

          <ProcessButton
            isLoading={blogPostIsLoading}
            btnText={routerState.isUpdate ? "Update" : "Submit"}
            onClick={onSubmit}
          />
        </form>
      }
    </>
  );
}
