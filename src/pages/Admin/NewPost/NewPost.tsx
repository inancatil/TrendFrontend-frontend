import { Button, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import TextEditor from "../../../components/Admin/TextEditor/TextEditor";
import useHttpBlogPost from "../../../hooks/api/useHttpBlogPost";
import useHttpCategory from "../../../hooks/api/useHttpCategory";
import { useSelector } from "../../../store";

export default function NewPost() {
  const httpCategory = useHttpCategory();
  const httpBlogPost = useHttpBlogPost();
  const authReducer = useSelector((state) => state.authReducer);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    httpCategory.getAllCategories().then((res: any) => {
      const allCategories = res.categories.map((category) => {
        return {
          id: category.id,
          name: category.name,
        };
      });
      setCategories(allCategories);
    });
  }, []);

  const onSubmit = () => {
    httpBlogPost
      .addNewBlogPost({
        title: "title",
        content: "content",
        imageUrl: "imgurl",
        author: authReducer.userData.userId,
        date: "dumydate",
        tags: ["dummytag"],
        categoryId: selectedCategoryId,
      })
      .then((res: any) => {
        console.log("Success!!!: " + res);
      });
  };
  return (
    <div>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedCategoryId}
        onChange={(e) => setSelectedCategoryId(e.target.value as string)}
      >
        {categories.map((category: any) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
      <TextEditor />
      <Button variant="contained" color="primary" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
}
