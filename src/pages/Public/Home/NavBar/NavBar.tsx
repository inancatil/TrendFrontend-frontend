import React from "react";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { useMediaQuery } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  button: {
    fontSize: 15,
    color: "black",
    fontWeight: "bolder",
    paddingRight: 15,
    "&:hover": {
      color: "blue",
      "&:after": {
        content: "''",
        position: "absolute",
        width: "90%",
        height: "2px",
        marginTop: 25,
        backgroundColor: "blue",
        left: 2,
        animation: `$myEffect 500ms ${theme.transitions.easing.easeInOut}`,
      },
    },
  },
  "@keyframes myEffect": {
    "0%": {
      width: 0,
    },
    "100%": {
      width: "90%",
    },
  },
}));

interface Props {
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

interface INavBarProps {
  children: React.ReactNode;
}

export default function NavBar(props: INavBarProps) {
  const classes = useStyles();
  const history = useHistory();
  const matches = useMediaQuery("(min-width:1200px)");
  const [drawerState, setDrawerState] = React.useState(false);

  const list = (anchor: string) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
    >
      <List>
        {["Home", "Blog", "About Me", "Contact"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar
          style={{
            backgroundColor: "#f5f8f9",
            boxShadow: "rgb(0 0 0 / 20%) 0px 5px 4px",
            height: 75,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Toolbar>
            <Container
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                style={{ flexGrow: 1, cursor: "pointer", color: "black" }}
                onClick={() => history.push("/")}
              >
                Trend-Frontend
              </Typography>
              {matches ? (
                <Box style={{ flexGrow: 0.1 }}>
                  <Link
                    to={"/"}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Button className={classes.button}>Home</Button>
                  </Link>
                  <Link
                    to={"/blog"}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Button className={classes.button}>Blog</Button>
                  </Link>
                  <Link
                    to={"/about-me"}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Button className={classes.button}>About Me</Button>
                  </Link>
                  <Link
                    to={"/contact"}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Button className={classes.button}>Contact</Button>
                  </Link>
                </Box>
              ) : (
                <>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={() => setDrawerState(true)}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Drawer
                    anchor={"right"}
                    open={drawerState}
                    onClose={() => setDrawerState(false)}
                  >
                    {list("right")}
                  </Drawer>
                </>
              )}
            </Container>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      {props.children}
    </>
  );
}
