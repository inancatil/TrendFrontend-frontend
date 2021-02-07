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
import { IBlogPost } from "../../../../types";
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

interface IProps {
  blogPosts: IBlogPost[];
}

export default function LastUpdatedCard({ blogPosts }: IProps) {
  const classes = useStyles();

  const list = blogPosts
    .sort((a, b) => compare(new Date(a.date), new Date(b.date), false))
    .slice(0, 5)
    .map((bp) => (
      <ListItem key={bp.id} disableGutters>
        <ListItemIcon className={classes.listIcon}>•</ListItemIcon>
        <Link
          to={{
            pathname: `/blog/${bp.title}`,
            state: { postDetails: bp },
          }}
        >
          <ListItemText
            className={classes.item}
            primary={_.upperFirst(bp.title)}
          />
        </Link>
      </ListItem>
    ));

  return (
    <ListViewCard title="Last Updated Posts">
      <List>{list}</List>
    </ListViewCard>
  );
}
