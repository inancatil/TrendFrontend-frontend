import React, { useState } from "react";
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
import { SearchIcon } from "@material-ui/data-grid";
import InputBase from "@material-ui/core/InputBase";
import Footer from "../Footer/Footer";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import { useSelector } from "../../../store";
import { toggleDarkMode } from "../../../store/Theme/action";
import { useDispatch } from "react-redux";

const NAVBAR_HEIGHT = 75;
const BOTTOM_MARGIN = 25;
const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: theme.palette.background.default,

    height: NAVBAR_HEIGHT,
    boxShadow: "rgb(0 0 0 / 20%) 0px 5px 4px",
  },
  list: {
    width: 250,
  },
  siteName: {
    color: theme.palette.text.primary,
    cursor: "pointer",
  },
  btnContainer: {
    textDecoration: "none !important",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "transparent",
    fontSize: 15,
    fontWeight: "bolder",
    marginLeft: 15,
    "&:hover": {
      color: "#3f50b5",
      "&:after": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "2px",
        marginTop: 15,
        backgroundColor: "#3f50b5",
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
  search: {
    display: "flex",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#c1c1c1",
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    color: "black",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
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

const useDarkToggleStyles = makeStyles((theme) => ({
  animatedItem: {
    animation: `$enterAnim 2000ms ${theme.transitions.easing.easeInOut}`,
  },

  "@keyframes enterAnim": {
    "0%": {
      transform: "translateY(0px)",
    },
    "50%": {
      transform: "translateY(50px)",
    },
    "100%": {
      transform: "translateY(0)",
    },
  },
}));

const DarkModeToggle = ({ isMobileSize }) => {
  const classes = useDarkToggleStyles();
  const dispatch = useDispatch();
  const themeReducer = useSelector((state) => state.themeReducer);
  const [isDark, setisDark] = React.useState(themeReducer.type === "dark");
  const isDarkMode = themeReducer.type === "dark";

  useEffect(() => {
    setisDark(!isDark);
  }, [themeReducer]);

  return (
    <Box
      display="flex"
      justifyContent={!isMobileSize ? "left" : "center"}
      alignItems="center"
      marginLeft={2}
      marginRight={2}
      style={{ cursor: "pointer" }}
      onClick={() => dispatch(toggleDarkMode())}
    >
      <IconButton color="primary" style={{ overflow: "hidden" }}>
        <Box className={clsx(classes.animatedItem)}>
          {isDark ? <NightsStayIcon /> : <WbSunnyIcon />}
        </Box>
      </IconButton>
    </Box>
  );
};

interface INavBarProps {
  children: React.ReactNode;
}

export default function NavBar(props: INavBarProps) {
  const classes = useStyles();
  const history = useHistory();
  const matches = useMediaQuery("(min-width:1200px)");
  const [drawerState, setDrawerState] = React.useState(false);
  const [searchQuery, setsearchQuery] = React.useState("");

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
        <Link to={"/"} className={classes.btnContainer}>
          <ListItem button>
            <ListItemText primary={"Home"} />
          </ListItem>
        </Link>
        <Link to={"/blog"} className={classes.btnContainer}>
          <ListItem button>
            <ListItemText primary={"Blogs"} />
          </ListItem>
        </Link>
        <Link to={"/about-me"} className={classes.btnContainer}>
          <ListItem button>
            <ListItemText primary={"About Me"} />
          </ListItem>
        </Link>
        <DarkModeToggle isMobileSize={matches} />
      </List>
    </div>
  );

  const onSearch = () => {
    history.push(`/blog/?search=${searchQuery}`);
    setsearchQuery("");
  };

  return (
    <>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar className={classes.appbar}>
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
                className={classes.siteName}
                variant="h5"
                onClick={() => history.push("/")}
              >
                {"{ ...trendfrontend }"}
              </Typography>
              {matches ? (
                <Box display="flex" flexDirection="row">
                  <Link to={"/"} className={classes.btnContainer}>
                    <Button disableRipple className={classes.button}>
                      Home
                    </Button>
                  </Link>
                  <Link to={"/blog"} className={classes.btnContainer}>
                    <Button disableRipple className={classes.button}>
                      Blog
                    </Button>
                  </Link>
                  <Link to={"/about-me"} className={classes.btnContainer}>
                    <Button disableRipple className={classes.button}>
                      About Me
                    </Button>
                  </Link>
                  <DarkModeToggle isMobileSize={matches} />
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder="Search…"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      inputProps={{ "aria-label": "search" }}
                      value={searchQuery}
                      onChange={(e) => setsearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && onSearch()}
                    />
                  </div>
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
      <Footer />
    </>
  );
}
