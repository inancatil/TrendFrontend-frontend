import { makeStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";
import React from "react";
import { Link } from "react-router-dom";
import useHttpCategory from "../../../../hooks/api/useHttpCategory";
import { compare } from "../../../../tools/utils";
import ListViewCard from "./ListViewCard";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  catTitle: {
    marginBottom: theme.spacing(2),
  },
  catText: {
    cursor: "pointer",
    fontSize: 20,
  },
}));

export default function Categories() {
  const classes = useStyles();
  //send as prop later
  const { categories, isLoading } = useHttpCategory({ isFetchNeeded: true });

  const list = categories
    .sort((a, b) => compare(a.name, b.name, false))
    .map((cat) => (
      <Link key={cat.id} to={`/blog/?category=${cat.name}`}>
        <Typography className={classes.catText}>
          {_.upperFirst(cat.name)} ({cat.blogPosts.length})
        </Typography>
      </Link>
    ));

  return (
    <ListViewCard title="Categories" isLoading={isLoading}>
      {list}
    </ListViewCard>
  );
}
