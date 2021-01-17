import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Box, Container } from "@material-ui/core";
import { IBlogPost } from "../../../../types";
import { Link } from "react-router-dom";
import moment from "moment";
import parse from "html-react-parser";

interface IProps {
  postDetails: IBlogPost;
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 300,
    position: "relative",
    marginBottom: 15,
    "&::before": {
      height: "100%",
      width: "100%",
      position: "absolute",
      top: 0,
      left: "-15px",
      content: "''", //çokomelli
      backgroundColor: "blue",
      zIndex: -1,
      display: "block",
    },
  },
  title: {
    fontWeight: "bolder",
  },
  //z index te proplem var.
  test: {
    "&::before": {
      height: "100%",
      width: "100%",
      position: "absolute",
      top: 0,
      left: "-15px",
      content: "''", //çokomelli
      backgroundColor: "blue",
      zIndex: -1,
      display: "block",
    },
  },
});

export default function Article({ postDetails }: IProps) {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <Box>
        <CardContent>
          <Link
            to={{
              pathname: `/blog/${postDetails.title}`,
              state: { postDetails },
            }}
          >
            <Typography variant="h4" className={classes.title} noWrap>
              {postDetails.title}
            </Typography>
          </Link>
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
              {
                postDetails.content.replace(
                  /<[^>]+>/g,
                  ""
                ) /**Removes all html tags */
              }
              {/* {
              <Container maxWidth="lg" className={classes.root}>
                {postDetails.content
                  .match(/<(.*?)( .*?|)>.*?<\/(\1)>/gs)!
                  .map((el: string, i: number) => { 
                    if (el.includes("custom-iframe")) {
                      const url = el
                        .split('class="custom-iframe">')[1]
                        .split("</span>");
                      return <IFrame key={i} url={url[0]} />;
                    }
                    if (el.substring(1, 4) === "pre") {
                      return <PrismBlock key={i} code={el} />;
                    } else
                      return (
                        <React.Fragment key={i}>{parse(el)}</React.Fragment>
                      );
                  })}
              </Container>
            } */}
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
            {moment(postDetails.date).format("MMM Do YY")}
          </Typography>
        </Typography>
      </Container>
    </Card>
  );
}
