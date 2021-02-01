import Button from "@material-ui/core/Button";
import React, { useMemo } from "react";
import CustomTable, {
  HeadCell,
} from "../../../components/Admin/CustomTable/CustomTable";
import useHttpCategory from "../../../hooks/api/useHttpCategory";
import { ICategory } from "../../../types";
import NewCategoryModal from "./NewCategoryModal/NewCategoryModal";

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
    label: "Number Of Posts",
    isSortable: true,
  },
];

export default function Categories() {
  const [newCategoryModalOpen, setNewCategoryModalOpen] = React.useState(false);
  const { categories, addNewCategory, isLoading } = useHttpCategory({
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

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setNewCategoryModalOpen(true)}
      >
        Add New
      </Button>
      <CustomTable
        headCells={headCells}
        tableData={rows}
        isLoading={isLoading}
      />
      <NewCategoryModal
        open={newCategoryModalOpen}
        setOpen={setNewCategoryModalOpen}
        addCategory={addNewCategory}
      />
    </>
  );
}
