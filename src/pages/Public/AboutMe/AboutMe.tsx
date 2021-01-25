import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import { deepPurple } from "@material-ui/core/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  avatarCol: {
    fontSize: 14,
    flexBasis: "27%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    "&:after": {
      position: "absolute",
      height: "100%",
      right: 0,
      background: "#f5f8f9",
      content: "''",
      width: 2,
      display: "block",
    },
  },
  description: {
    flexBasis: "73%",
    padding: 35,
  },
  content: {
    display: "flex",
    flexDirection: "row",

    padding: "0px !important",
  },
  avatar: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginTop: 25,
    marginBottom: 75,
  },
  buttonContainer: {
    position: "relative",
    width: "100%",
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
  cvButton: {
    position: "relative",
    width: "100%",
    height: 75,
    display: "flex",
    alignItems: "center",
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
}));

export default function AboutMe() {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <Box className={classes.avatarCol}>
            {" "}
            <Avatar className={classes.avatar}>M</Avatar>
            <Container className={classes.buttonContainer}>
              <Button size="small" className={classes.cvButton}>
                <FontAwesomeIcon
                  size={"2x"}
                  icon="file-pdf"
                  style={{ flexGrow: 0.2 }}
                />
                <span style={{ flexGrow: 1, textAlign: "left" }}>
                  Download my CV
                </span>
              </Button>
            </Container>
          </Box>
          <Container className={classes.description}>
            <Typography variant="h3" gutterBottom>
              Meltem Gürsoy
            </Typography>
            <p
              style={{
                fontFamily: "Merriweather",
                fontWeight: 400,
                fontSize: 22,
                letterSpacing: "-0.05px",
                lineHeight: "31px",
              }}
            >
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ulla corper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat. Duis autem vel eum iriure dolor in hendr rit in
              vulputate velit esse molestie consequat, vel illum dolore eu
              feugiat nulla facilisis at vero eros et accumsan et iusto odio
              dignissim qui blandit praesent luptatum zzril delenit augue duis
              dolore te feugait nulla facilisi. Lorem ipsum dolor sitamet,
              consectetuer adipiscing elit.
            </p>
          </Container>
        </CardContent>
      </Card>
    </Container>
  );
}
