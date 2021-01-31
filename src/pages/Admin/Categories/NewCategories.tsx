import React, { useMemo } from "react";
import CustomTable, {
  HeadCell,
} from "../../../components/Admin/CustomTable/CustomTable";
import useHttpCategory from "../../../hooks/api/useHttpCategory";
import { ICategory } from "../../../types";

const headCells: HeadCell[] = [
  {
    id: "id",
    align: "left",
    label: "Id",
    hidden: true,
  },
  {
    id: "name",
    align: "left",
    label: "Name",
    isSortable: true,
  },
  {
    id: "numOfPosts",
    align: "right",
    label: "numOfPosts",
    isSortable: true,
  },
];

export default function NewCategories() {
  const { categories, deleteCategoryById, addNewCategory } = useHttpCategory({
    isFetchNeeded: true,
  });

  const rows = useMemo(() => {
    const convertToTableData = (data: ICategory[]) => {
      //Kontrol et. Birkaç kez çalışıyor.
      if (data.length === 0) return [];
      return data.map((category) => {
        return {
          id: category.id,
          name: category.name,
          numOfPosts: category.blogPosts.length,
        };
      });
    };
    return convertToTableData(categories);
  }, [categories]);

  return <CustomTable headCells={headCells} tableData={rows} />;
}
