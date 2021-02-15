import React, { useMemo, useState } from "react";
import useHttpAuth from "./../../../hooks/api/useHttpAuth";
import { HeadCell } from "../../../components/Admin/CustomTable/CustomTable";
import CustomTable from "./../../../components/Admin/CustomTable/CustomTable";
import { IUser } from "../../../types";
import Button from "@material-ui/core/Button";
import CreateNewUser from "./CreateNewUser";

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
    id: "email",
    align: "left",
    label: "Email",
    isSortable: true,
  },
  {
    id: "posts",
    align: "left",
    label: "Posts",
    isSortable: true,
  },
  {
    id: "role",
    align: "right",
    label: "Role",
    isSortable: true,
  },
];

export default function Users() {
  const { createNewUser, isLoading, allUsers } = useHttpAuth({
    isFetchNeeded: true,
  });
  const [newUserModalIsOpen, setNewUserModalIsOpen] = useState(false);
  const rows = useMemo(() => {
    const convertToTableData = (
      data: Omit<IUser, "isLoggedIn" | "jwtToken">[]
    ) => {
      //Kontrol et. Birkaç kez çalışıyor.
      if (data.length === 0) return [];
      return data.map((user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          posts: user.blogPosts.length,
          role: user.role,
        };
      });
    };
    return convertToTableData(allUsers);
  }, [allUsers]);

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setNewUserModalIsOpen(true)}
      >
        Create User
      </Button>
      <CustomTable
        headCells={headCells}
        tableData={rows}
        isLoading={isLoading}
      />

      <CreateNewUser
        createNewUser={createNewUser}
        isLoading={isLoading}
        isOpen={newUserModalIsOpen}
        setIsOpen={setNewUserModalIsOpen}
      />
    </div>
  );
}
