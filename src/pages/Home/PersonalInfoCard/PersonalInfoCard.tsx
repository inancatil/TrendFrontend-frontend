import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Avatar } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";

import SvgIcon from "@material-ui/core/SvgIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faGift } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 275,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
    cardContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    socialButtons: {
      cursor: "pointer",
      color: "#cccfd3",
      "&:hover": {
        color: "black",
        transition: "color 200ms linear",
      },
    },
    cvButton: {
      position: "relative",
      width: "100%",
      height: 75,
      color: "#a6a9ac",
      "&:hover": {
        color: "black",
        transition: "color 200ms linear",
      },
      "&:before": {
        position: "absolute",
        left: 0,
        top: 0,
        height: 2,
        background: "#f5f8f9",
        content: "''",
        width: "100%",
        display: "block",
      },
    },
  })
);

export default function PersonalInfoCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent classes={{ root: classes.cardContent }}>
        <Avatar className={classes.purple}>OP</Avatar>

        <Typography variant="h5" component="h2">
          Meltem Gürsoy
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Front-End Developer
        </Typography>
        <CardActions>
          <FontAwesomeIcon
            className={classes.socialButtons}
            size={"2x"}
            icon={["fab", "linkedin"]}
          />
          <FontAwesomeIcon
            className={classes.socialButtons}
            size={"2x"}
            icon={["fab", "github"]}
          />
        </CardActions>
      </CardContent>
      <Button size="small" className={classes.cvButton}>
        <FontAwesomeIcon
          size={"2x"}
          icon="file-pdf"
          style={{ flexGrow: 0.2 }}
        />
        <span style={{ flexGrow: 1, textAlign: "left" }}>Download my CV</span>
      </Button>
    </Card>
  );
}
