import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ProcessButton from "../../../components/Admin/ProcessButton/ProcessButton";
import TextEditor from "../../../components/Admin/TextEditor/TextEditor";
import useHttpBlogPost from "../../../hooks/api/useHttpBlogPost";
import useHttpCategory from "../../../hooks/api/useHttpCategory";
import { useSelector } from "../../../store";
import { ICategory } from "../../../types";
import TagSelect from "./TagSelect";
import useHttpTag from "./../../../hooks/api/useHttpTag";
import { ITag } from "./../../../types/tag";
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
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
  const httpCategory = useHttpCategory();
  const httpBlogPost = useHttpBlogPost();
  const httpTag = useHttpTag();
  const userReducer = useSelector((state) => state.userReducer);
  const categoryReducer = useSelector((state) => state.categoryReducer);
  const [categories, setCategories] = useState<any>([]);
  const [tags, setTags] = useState<ITag[]>([]);
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    ""
  );
  const [editorContent, setEditorContent] = useState("");
  const [title, setTitle] = useState("");

  const classes = useStyles();
  useEffect(() => {
    httpCategory.getAllCategories().then((res: ICategory[] | undefined) => {
      const allCategories = res!.map((category) => {
        return {
          id: category.id,
          name: category.name,
        };
      });
      setCategories(allCategories);
    });

    httpTag.getAllTags().then((res: ITag[] | undefined) => {
      const allTags = res!.map((tag: any) => {
        console.log(tag);
        return {
          id: tag.id,
          value: tag.name,
        };
      });
      setTags(allTags);
    });
  }, []);

  useEffect(() => {
    const allCategories = categoryReducer!.map((category) => {
      return {
        id: category.id,
        name: category.name,
      };
    });
    setCategories(allCategories);
  }, [categoryReducer]);

  const onSubmit = () => {
    console.log(selectedTags);
    httpBlogPost
      .addNewBlogPost({
        title: title,
        content: editorContent,
        imageUrl: "imgurl",
        author: userReducer.id,
        date: "dumydate",
        tags: selectedTags,
        categoryId: selectedCategoryId,
      })
      .then((res: any) => {
        if (res) console.log("Success!!!: " + res);
      });
  };
  return (

    <form className={classes.root} noValidate autoComplete="off">
      <FormControl fullWidth variant="outlined" className={classes.formControl}>
        <TextField
          id="outlined-full-width"
          label="Title"
          placeholder="Title..."
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={title}
          onChange={(v) => setTitle(v.currentTarget.value)}
        />
      </FormControl>

      <FormControl fullWidth variant="outlined" className={classes.formControl}>
        <InputLabel>Categories</InputLabel>
        <Select
          onChange={(e) => setSelectedCategoryId(e.target.value as string)}
          label="Categories"
          value={selectedCategoryId}
        >
          {categories.map((category: any) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

 
      <FormControl fullWidth className={classes.formControl}>
        <TagSelect
          options={tags}
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

  );
}
