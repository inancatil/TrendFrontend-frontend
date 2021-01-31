import React from "react";
import useHttpCategory from "./../../../../hooks/api/useHttpCategory";

export default function Categories() {
  const { categories } = useHttpCategory();
  return <div></div>;
}
