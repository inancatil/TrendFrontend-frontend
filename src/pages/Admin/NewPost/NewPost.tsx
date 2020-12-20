import { Button, MenuItem, Select, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import TextEditor from "../../../components/Admin/TextEditor/TextEditor";
import useHttpBlogPost from "../../../hooks/api/useHttpBlogPost";
import useHttpCategory from "../../../hooks/api/useHttpCategory";
import { useSelector } from "../../../store";
import { ICategory } from "../../../types";

export default function NewPost() {
  const httpCategory = useHttpCategory();
  const httpBlogPost = useHttpBlogPost();
  const userReducer = useSelector((state) => state.userReducer);
  const categoryReducer = useSelector((state) => state.categoryReducer);
  const [categories, setCategories] = useState<any>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    ""
  );
  const [editorContent, setEditorContent] = useState("");
  const [title, setTitle] = useState("");
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
    httpBlogPost
      .addNewBlogPost({
        title: title,
        content: editorContent,
        imageUrl: "imgurl",
        author: userReducer.id,
        date: "dumydate",
        tags: ["dummytag"],
        categoryId: selectedCategoryId,
      })
      .then((res: any) => {
        if (res) console.log("Success!!!: " + res);
      });
  };
  return (
    <div>
      <TextField
        id="outlined-full-width"
        label="Title"
        style={{ margin: 8 }}
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
      Select Category{" "}
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        style={{ width: 200 }}
        value={selectedCategoryId}
        onChange={(e) => setSelectedCategoryId(e.target.value as string)}
      >
        {categories.map((category: any) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
      <TextEditor
        editorContent={editorContent}
        setEditorContent={setEditorContent}
      />
      <Button variant="contained" color="primary" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
}
