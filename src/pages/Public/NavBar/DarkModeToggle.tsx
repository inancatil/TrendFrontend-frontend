import React from "react";
import Box from "@material-ui/core/Box";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useSelector } from "../../../store";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import { toggleDarkMode } from "../../../store/Theme/action";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { usePrevious } from "./../../../tools/utils";

const useDarkToggleStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "absolute",
  },
  enterAnim: {
    animation: `$enterAnim 1000ms ${theme.transitions.easing.easeInOut}`,
    transform: "translateY(0)",
  },
  exitAnim: {
    animation: `$exitAnim 1000ms ${theme.transitions.easing.easeInOut}`,
    transform: "translateY(50px)",
  },
  "@keyframes enterAnim": {
    "0%": {
      transform: "translateY(50px)",
    },
    "100%": {
      transform: "translateY(0)",
    },
  },
  "@keyframes exitAnim": {
    "0%": {
      transform: "translateY(0)",
    },
    "100%": {
      transform: "translateY(50px)",
    },
  },
}));

//Make it generic.
/**
 * enabled and disabled components as prop
 * state as prop
 * usePrevious will be written inside.
 * onClick as prop
 */
export default function DarkModeToggle() {
  const isMobileSize = useMediaQuery("(min-width:1200px)");
  const classes = useDarkToggleStyles();
  const dispatch = useDispatch();
  const themeReducer = useSelector((state) => state.themeReducer);
  const isDarkMode = themeReducer.type === "dark";
  const prevMode = usePrevious(isDarkMode);
  const enableAnim = isDarkMode !== prevMode;
  return (
    <Box
      position="relative"
      display="flex"
      justifyContent={!isMobileSize ? "left" : "center"}
      alignItems="center"
      marginLeft={2}
      marginRight={2}
      style={{ cursor: "pointer" }}
      onClick={() => dispatch(toggleDarkMode())}
    >
      <IconButton color="primary" style={{ overflow: "hidden" }}>
        <Box
          style={{
            transform: isDarkMode ? "translateY(50px)" : "translateY(0)",
          }}
          className={clsx(
            classes.root,
            {
              [classes.enterAnim]: !isDarkMode && enableAnim,
            },
            {
              [classes.exitAnim]: isDarkMode && enableAnim,
            }
          )}
        >
          <WbSunnyIcon />
        </Box>
        <Box
          style={{
            transform: isDarkMode ? "translateY(0)" : "translateY(50px)",
          }}
          className={clsx(
            classes.root,
            {
              [classes.enterAnim]: isDarkMode && enableAnim,
            },
            {
              [classes.exitAnim]: !isDarkMode && enableAnim,
            }
          )}
        >
          <NightsStayIcon />
        </Box>
      </IconButton>
    </Box>
  );
}
