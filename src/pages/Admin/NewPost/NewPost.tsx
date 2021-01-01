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
import useHttpTag from "./../../../hooks/api/useHttpTag";
import CustomCreatableSelect from "./CustomCreatableSelect";
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
export default function NewPost() {
  //???
  useHttpCategory(true);
  useHttpTag(true);
  const httpBlogPost = useHttpBlogPost();
  const userReducer = useSelector((state) => state.userReducer);
  const categoryReducer = useSelector((state) => state.categoryReducer);
  const tagReducer = useSelector((state) => state.tagReducer);
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    ""
  );
  const [editorContent, setEditorContent] = useState("");
  const [title, setTitle] = useState("");
  const classes = useStyles();

  const onSubmit = () => {
    httpBlogPost.addNewBlogPost({
      title: title,
      content: editorContent,
      imageUrl: "imgurl",
      author: userReducer.id,
      date: "dumydate",
      tags: selectedTags,
      categoryId: selectedCategoryId,
    });
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
          btnText={"Submit"}
          onClick={onSubmit}
        />
      </form>
    </>
  );
}
