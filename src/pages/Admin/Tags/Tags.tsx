import React, { useMemo } from "react";
import CustomTable, {
  HeadCell,
} from "../../../components/Admin/CustomTable/CustomTable";
import useHttpTag from "./../../../hooks/api/useHttpTag";
//import { ITag } from "./../../../types/tag";

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
];

export default function Tags() {
  const { tags, isLoading } = useHttpTag({
    isFetchNeeded: true,
  });

  const rows = useMemo(() => {
    const convertToTableData = (data: any[]) => {
      //Kontrol et. Birkaç kez çalışıyor.
      if (data.length === 0) return [];
      return data.map((t) => {
        return {
          id: t.id,
          value: t.name,
        };
      });
    };
    return convertToTableData(tags);
  }, [tags]);
  return (
    <CustomTable headCells={headCells} tableData={rows} isLoading={isLoading} />
  );
}
