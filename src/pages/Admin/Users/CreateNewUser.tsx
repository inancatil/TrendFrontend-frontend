import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Theme } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import ProcessButton from "../../../components/Admin/ProcessButton/ProcessButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      padding: 20,
    },

    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

interface IProps {
  isOpen: boolean;
  setIsOpen: (x: boolean) => void;
  createNewUser: (
    name: string,
    email: string,
    password: string,
    role: string
  ) => Promise<void>;
  isLoading: boolean;
}

export default function CreateNewUser({
  isOpen,
  setIsOpen,
  createNewUser,
  isLoading,
}: IProps) {
  const classes = useStyles();
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    password: "",
    role: "",
  });

  const resetFieldsAndClose = () => {
    setUserData({
      email: "",
      name: "",
      password: "",
      role: "",
    });
    setIsOpen(false);
  };

  const submitNewUser = (e: any) => {
    e.preventDefault();
    createNewUser(
      userData.name,
      userData.email,
      userData.password,
      userData.role
    );
    resetFieldsAndClose();
  };

  const handleClose = () => {
    resetFieldsAndClose();
  };

  return (
    <Dialog
      fullWidth
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">New User</DialogTitle>
      <form className={classes.root} onSubmit={submitNewUser}>
        <FormControl className={classes.formControl}>
          <TextField
            required
            id="name"
            variant="outlined"
            label="Name"
            value={userData.name}
            onChange={(e) =>
              setUserData({
                ...userData,
                name: e.target.value,
              })
            }
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            required
            id="email"
            type="email"
            variant="outlined"
            label="Email"
            value={userData.email}
            onChange={(e) =>
              setUserData({
                ...userData,
                email: e.target.value,
              })
            }
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            required
            id="password"
            type="password"
            variant="outlined"
            label="Password"
            value={userData.password}
            onChange={(e) =>
              setUserData({
                ...userData,
                password: e.target.value,
              })
            }
          />
        </FormControl>
        <FormControl
          variant="outlined"
          className={classes.formControl}
          required
        >
          <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={userData.role}
            onChange={(e) =>
              setUserData({
                ...userData,
                role: e.target.value as string,
              })
            }
            label="Age"
          >
            <MenuItem value={"Admin"}>Admin</MenuItem>
            <MenuItem value={"User"}>User</MenuItem>
          </Select>
        </FormControl>
        <ProcessButton isSubmit isLoading={isLoading} btnText={"Submit"} />
        {/* <Button variant="contained" color="primary" type="submit">
          Submit
        </Button> */}
      </form>
    </Dialog>
  );
}
