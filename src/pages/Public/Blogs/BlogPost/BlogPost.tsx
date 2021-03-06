import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { createStyles, makeStyles } from "@material-ui/core";
import useBlogPost from "../../../../hooks/useBlogPost";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { smoothScrollToTop } from "../../../../tools/utils";
import CustomChip from "./CustomChip";
import useHttpBlogPost from "../../../../hooks/api/useHttpBlogPost";

const useStyles = makeStyles(() =>
  createStyles({
    root: { padding: 25, marginBottom: 35, marginTop: 15 },
    title: {
      fontWeight: "bolder",
      lineHeight: 1.1,
      fontSize: "clamp(1.2rem,calc(1rem + 3.5vw),4rem)",
      marginBottom: 10,
    },
    chipGroup: { marginBottom: 35 },
  })
);

//REFACTOR NEEDED
export default function BlogPost() {
  const classes = useStyles();
  const { bptitle } = useParams<any>();
  const { singlePost, getBlogPostByTitle, isLoading } = useHttpBlogPost();
  const { getAllContent } = useBlogPost();
  const postDetails = singlePost;
  useEffect(() => {
    getBlogPostByTitle(bptitle);
    smoothScrollToTop(100);
  }, [bptitle, getBlogPostByTitle]);

  return (
    <>
      {postDetails !== null && !isLoading && (
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
          <Typography variant="h5" color="primary">
            Total View: {postDetails.viewCount ? postDetails.viewCount : 0}
          </Typography>
          <Paper elevation={6} className={classes.root}>
            {getAllContent(postDetails.content)}
          </Paper>
        </>
      )}
    </>
  );
}
