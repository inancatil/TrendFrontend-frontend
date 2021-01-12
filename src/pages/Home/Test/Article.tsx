import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box, Container } from "@material-ui/core";
import { IBlogPost } from "../../../types";

interface IProps {
  postDetails: IBlogPost;
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 300,
    position: "relative",
    marginBottom: 15,
  },
  title: {
    fontWeight: "bolder",
  },
  //z index te proplem var. üst comp ta background color verince bura patlayor
  test: {
    "&::before": {
      height: "100%",
      width: "100%",
      position: "absolute",
      top: 0,
      left: "-15px",
      content: '""', //çokomelli
      backgroundColor: "blue",
      zIndex: -1,
    },
  },
});

export default function Article({ postDetails }: IProps) {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <Box
        position="absolute"
        width="100%"
        height="100%"
        className={classes.test}
      >
        <CardContent>
          <Typography variant="h4" className={classes.title} noWrap>
            {postDetails.title}
          </Typography>
          <Box
            style={{
              backgroundColor: "#eceff2",
              width: "100%",
              height: 1,
            }}
          />
          <div
            style={{
              paddingTop: 15,
            }}
          >
            <div
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 5,
                WebkitBoxOrient: "vertical",
              }}
            >
              {postDetails.content.replace(/<[^>]+>/g, "")}
            </div>
          </div>
        </CardContent>
      </Box>
      <Container style={{ position: "absolute", bottom: 10 }}>
        <Typography
          variant="body1"
          component="p"
          style={{ fontWeight: "bold" }}
        >
          {postDetails.author.name}{" "}
          <Typography variant="body2" component="span">
            on 11 june 2020
          </Typography>
        </Typography>
      </Container>
    </Card>
  );
}
