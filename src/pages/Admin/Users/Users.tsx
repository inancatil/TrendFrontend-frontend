import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ProcessButton from "./../../../components/Admin/ProcessButton/ProcessButton";
import useHttpAuth from "./../../../hooks/api/useHttpAuth";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
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

export default function Users() {
  const classes = useStyles();
  const { createNewUser, isLoading } = useHttpAuth();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const submitNewUser = (e: any) => {
    e.preventDefault();
    console.log(userData);
    createNewUser(userData.email, userData.password, userData.role);
  };

  return (
    <div>
      <form className={classes.root} onSubmit={submitNewUser}>
        <FormControl className={classes.formControl}>
          <TextField
            required
            id="email"
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
    </div>
  );
}
