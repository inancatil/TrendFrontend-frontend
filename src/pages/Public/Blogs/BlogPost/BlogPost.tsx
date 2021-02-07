import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createStyles, makeStyles } from "@material-ui/core";
import useBlogPost from "../../../../hooks/useBlogPost";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { IBlogPost } from "../../../../types";
import { smoothScrollToTop } from "../../../../tools/utils";
import CustomChip from "./CustomChip";

const useStyles = makeStyles(() =>
  createStyles({
    root: { padding: 25, marginBottom: 35 },
    title: {
      fontWeight: "bolder",
      lineHeight: 1.1,
      fontSize: "clamp(1.2rem,calc(1rem + 3.5vw),4rem)",
      marginBottom: 10,
    },
    chipGroup: { marginBottom: 35 },
  })
);

export default function BlogPost() {
  const classes = useStyles();
  const { state: routerState } = useLocation<any>();
  const { getAllContent } = useBlogPost();
  const postDetails: IBlogPost = routerState.postDetails;

  useEffect(() => {
    smoothScrollToTop(100);
  }, []);

  return (
    <>
      <Typography variant="h1" className={classes.title} color="primary">
        {postDetails.title}
      </Typography>
      <div className={classes.chipGroup}>
        {postDetails.tags.map((tag: any) => (
          <CustomChip
            key={tag.id}
            label={tag.name}
            variant="outlined"
            size="small"
          />
        ))}
      </div>
      <Paper elevation={6} className={classes.root}>
        {getAllContent(postDetails.content)}
      </Paper>
    </>
  );
}
