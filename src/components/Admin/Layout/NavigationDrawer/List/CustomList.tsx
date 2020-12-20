import React, { useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { SvgIcon } from "@material-ui/core";
import { Link, useRouteMatch } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

interface ICustomListProps {
  isDrawerOpen: boolean;
}
export default function CustomList(props: ICustomListProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const { url } = useRouteMatch();

  const handleClick = () => {
    if (props.isDrawerOpen) setOpen(!open);
  };

  useEffect(() => {
    if (!props.isDrawerOpen) {
      setOpen(false);
    }
  }, [props.isDrawerOpen]);

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <SvgIcon>
            <path
              fill="currentColor"
              d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z"
            />
          </SvgIcon>
        </ListItemIcon>
        <ListItemText primary="Posts" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <Link to={`${url}/posts`}>
              <ListItemText primary="All Posts" />
            </Link>
          </ListItem>
          <ListItem button className={classes.nested}>
            <Link to={`${url}/newpost`}>
              <ListItemText primary="Add New" />
            </Link>
          </ListItem>
          <ListItem button className={classes.nested}>
            <Link to={`${url}/categories`}>
              <ListItemText primary="Categories" />
            </Link>
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText primary="Tags" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
