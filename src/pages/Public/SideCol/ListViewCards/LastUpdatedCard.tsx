import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, Theme } from "@material-ui/core/styles";
import _ from "lodash";
import React from "react";
import { Link } from "react-router-dom";
import useHttpBlogPost from "../../../../hooks/api/useHttpBlogPost";
import { compare } from "../../../../tools/utils";
import ListViewCard from "./ListViewCard";

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    textDecoration: "underline",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  listIcon: {
    minWidth: 20,
    fontSize: 25,
  },
}));

export default function LastUpdatedCard() {
  const { blogPosts, isLoading } = useHttpBlogPost({ isFetchNeeded: true });
  const classes = useStyles();

  const list = blogPosts
    .sort((a, b) => compare(new Date(a.date), new Date(b.date), false))
    .slice(0, 5)
    .map((bp) => (
      <Link
        key={bp.id}
        to={{
          pathname: `/blog/${bp.title}`,
          state: { postDetails: bp },
        }}
      >
        <ListItem>
          <ListItemIcon className={classes.listIcon}>•</ListItemIcon>
          <ListItemText
            className={classes.item}
            primary={_.upperFirst(bp.title)}
          />
        </ListItem>
      </Link>
    ));

  return (
    <ListViewCard title="Last Updated Posts" isLoading={isLoading}>
      <List>{list}</List>
    </ListViewCard>
  );
}
