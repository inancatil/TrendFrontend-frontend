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
import { useLocation, useParams } from "react-router-dom";

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
  const { state: routerState } = useLocation<any>();
  const { isLoading: catIsLoading } = useHttpCategory({ isFetchNeeded: true });
  const { isLoading: tagIsLoading } = useHttpTag({ isFetchNeeded: true });
  const httpBlogPost = useHttpBlogPost();
  const userReducer = useSelector((state) => state.userReducer);
  const categoryReducer = useSelector((state) => state.categoryReducer);
  const tagReducer = useSelector((state) => state.tagReducer);

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
  const classes = useStyles();

  const onSubmit = () => {
    if (!postDetails) {
      httpBlogPost.addNewBlogPost({
        title: title,
        content: editorContent,
        imageUrl: "imgurl",
        author: userReducer.id,
        date: "dumydate",
        tags: selectedTags,
        categoryId: selectedCategoryId,
      });
    } else {
      httpBlogPost.updateBlogPost(postDetails.id, {
        title: title,
        content: editorContent,
        imageUrl: "imgurl",
        author: userReducer.id,
        date: "dumydate",
        tags: selectedTags,
        categoryId: selectedCategoryId,
      });
    }
  };

  useEffect(() => {
    if (httpBlogPost.isSuccessfull) {
      setSelectedTags([]);
      setSelectedCategoryId("");
      setEditorContent("");
      setTitle("");
    }
  }, [httpBlogPost.isSuccessfull]);

  return (
    <>
      {!catIsLoading &&
      !tagIsLoading &&
      categoryReducer.length > 0 &&
      tagReducer.length > 0 ? (
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

          <FormControl
            fullWidth
            variant="outlined"
            className={classes.formControl}
          >
            <InputLabel>Categories</InputLabel>
            <Select
              onChange={(e) => setSelectedCategoryId(e.target.value as string)}
              label="Categories"
              value={selectedCategoryId}
            >
              {categoryReducer.map((category: any) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth className={classes.formControl}>
            <CustomCreatableSelect
              allTags={tagReducer}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
          </FormControl>

          <FormControl fullWidth className={classes.formControl}>
            <TextEditor
              editorContent={editorContent}
              setEditorContent={setEditorContent}
            />
          </FormControl>

          <ProcessButton
            isLoading={httpBlogPost.isLoading}
            btnText={routerState.isUpdate ? "Update" : "Submit"}
            onClick={onSubmit}
          />
        </form>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}
