import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Box, Container } from "@material-ui/core";
import { IBlogPost } from "../../../../types";
import { Link } from "react-router-dom";
import moment from "moment";
import useBlogPost from "./../../../../hooks/useBlogPost";
import Paper from "@material-ui/core/Paper";

interface IProps {
  postDetails: IBlogPost;
}

const useStyles = makeStyles({
  root: {
    minHeight: 200,
    position: "relative",
    marginBottom: 15,
  },
  title: {
    fontWeight: "bolder",
  },
});

export default function Article({ postDetails }: IProps) {
  const classes = useStyles();
  const { summarizeContent } = useBlogPost();
  return (
    <Paper elevation={4}>
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
              id="content-container"
              style={{
                paddingTop: 15,
              }}
            >
              {
                <Container maxWidth="lg" className={classes.root}>
                  {summarizeContent(postDetails.content)}
                </Container>
              }
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
    </Paper>
  );
}
