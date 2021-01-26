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
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import { Link, useHistory } from "react-router-dom";

const NAVBAR_HEIGHT = 75;
const BOTTOM_MARGIN = 25;
const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  button: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "black",
    fontWeight: "bolder",
    marginLeft: 15,
    "&:hover": {
      color: "blue",
      "&:after": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "2px",
        marginTop: 25,
        backgroundColor: "blue",
        left: 0,
        animation: `$myEffect 500ms ${theme.transitions.easing.easeInOut}`,
      },
    },
  },
  "@keyframes myEffect": {
    "0%": {
      width: 0,
    },
    "100%": {
      width: "100%",
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

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setDrawerState(open);
  };

  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <Link
          to={"/"}
          style={{
            textDecoration: "none",
          }}
        >
          <ListItem button>
            <ListItemText primary={"Home"} />
          </ListItem>
        </Link>
        <Link
          to={"/blog"}
          style={{
            textDecoration: "none",
          }}
        >
          <ListItem button>
            <ListItemText primary={"Blogs"} />
          </ListItem>
        </Link>
        <Link
          to={"/about-me"}
          style={{
            textDecoration: "none",
          }}
        >
          <ListItem button>
            <ListItemText primary={"About Me"} />
          </ListItem>
        </Link>
        <Link
          to={"/contact"}
          style={{
            textDecoration: "none",
          }}
        >
          <ListItem button>
            <ListItemText primary={"Contact"} />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar
          style={{
            height: NAVBAR_HEIGHT,
            backgroundColor: "#f5f8f9",
            boxShadow: "rgb(0 0 0 / 20%) 0px 5px 4px",
          }}
        >
          <Toolbar
            style={{ height: 75, display: "flex", justifyContent: "center" }}
          >
            <Container
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                style={{ cursor: "pointer", color: "black" }}
                onClick={() => history.push("/")}
              >
                [...trendfrontend]
              </Typography>
              {matches ? (
                <Box>
                  <Link
                    to={"/"}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Button disableRipple className={classes.button}>
                      Home
                    </Button>
                  </Link>
                  <Link
                    to={"/blog"}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Button disableRipple className={classes.button}>
                      Blog
                    </Button>
                  </Link>
                  <Link
                    to={"/about-me"}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Button disableRipple className={classes.button}>
                      About Me
                    </Button>
                  </Link>
                  <Link
                    to={"/contact"}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Button disableRipple className={classes.button}>
                      Contact
                    </Button>
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
                    <MenuIcon color="secondary" />
                  </IconButton>
                  <Drawer
                    anchor={"right"}
                    open={drawerState}
                    onClose={() => setDrawerState(false)}
                  >
                    {list()}
                  </Drawer>
                </>
              )}
            </Container>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar style={{ height: NAVBAR_HEIGHT, marginBottom: BOTTOM_MARGIN }} />
      <Container maxWidth="md" style={{ paddingLeft: 24, paddingRight: 24 }}>
        {props.children!}
      </Container>
    </>
  );
}
