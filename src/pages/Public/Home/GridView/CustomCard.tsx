import React, { useState } from "react";
import {
  Box,
  Card,
  Chip,
  createStyles,
  makeStyles,
  Paper,
  Theme,
  Typography,
  useTheme,
} from "@material-ui/core";
import Image from "material-ui-image";
import bgPhoto from "../../../../assets/images/photo1.jpg";
import { IBlogPost } from "../../../../types";
import { Link } from "react-router-dom";
import moment from "moment";

interface IProps {
  postDetails: IBlogPost;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      padding: 7,
      textAlign: "center",
      color: theme.palette.text.secondary,
      position: "relative",
      cursor: "pointer",
    },
    chip: {
      padding: "1px 8px",
      fontSize: 12,
      fontWeight: "bold",
      textTransform: "uppercase",
      color: "#ffffff",
      border: "1px solid #ffffff",
    },
    box: {
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      },
    },
  })
);

export default function CustomCard({ postDetails }: IProps) {
  const theme = useTheme();
  const classes = useStyles();
  const [raised, setRaised] = useState<boolean>(false);
  return (
    <Paper elevation={5}>
      <Card
        raised={raised}
        onMouseOver={() => setRaised(true)}
        onMouseLeave={() => setRaised(false)}
        className={classes.card}
      >
        <Link to={`/blog/${postDetails.url}`}>
          <Box
            className={classes.box}
            position={"absolute"}
            zIndex={2}
            padding={"22px 30px"}
            width="calc(100% - 14px)"
            height="calc(100% - 14px)"
            textAlign="left"
          >
            <Typography
              id="title"
              paragraph
              variant="h5"
              style={{ color: "#ffffff", fontWeight: 900 }}
              noWrap
            >
              {postDetails.title}
            </Typography>
            {postDetails.category && (
              <Chip
                label={postDetails.category.name}
                variant="outlined"
                size="small"
                className={classes.chip}
              />
            )}
            <Typography
              style={{ position: "absolute", bottom: 40, color: "#ffffff" }}
            >
              {moment(postDetails.date).format("MMM Do YY")}
            </Typography>
          </Box>
          <Image src={bgPhoto} color={theme.palette.background.paper} />
        </Link>
      </Card>
    </Paper>
  );
}
