import Paper from "@material-ui/core/Paper";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { IF } from "../../../../tools/utils";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  catTitle: {
    marginBottom: theme.spacing(2),
  },
  catText: {
    cursor: "pointer",
    fontSize: 20,
  },
}));

interface IProps {
  title: string;
  isLoading: boolean;
  children: React.ReactNode;
}

export default function ListViewCard({ title, children, isLoading }: IProps) {
  const classes = useStyles();

  const content = (
    <Paper elevation={4} className={classes.root}>
      <Typography variant="h5" className={classes.catTitle}>
        {title}
      </Typography>
      {children}
    </Paper>
  );

  return <IF condition={!isLoading}>{content}</IF>;
}