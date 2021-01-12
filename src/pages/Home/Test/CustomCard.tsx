import React, { useState } from "react";
import {
  Box,
  Card,
  Chip,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import Image from "material-ui-image";
import bgPhoto from "../../../assets/images/photo1.jpg";
import { IBlogPost } from "../../../types";

interface IProps {
  postDetails: IBlogPost;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      padding: theme.spacing(2),
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
  })
);

export default function CustomCard({ postDetails }: IProps) {
  const classes = useStyles();
  const [isMouseOver, setisMouseOver] = useState<boolean>(false);
  console.log(postDetails);
  return (
    <Card
      raised={isMouseOver}
      onMouseOver={() => setisMouseOver(true)}
      onMouseLeave={() => setisMouseOver(false)}
      className={classes.card}
    >
      <Box
        style={{
          backgroundColor: isMouseOver ? " rgba(0, 0, 0, 0.3)" : "",
        }}
        position={"absolute"}
        zIndex={2}
        padding={"22px 30px"}
        width="calc(100% - 32px)"
        height="calc(100% - 32px)"
        textAlign="left"
      >
        <Typography
          paragraph
          variant="h5"
          style={{ color: "#ffffff", fontWeight: 900 }}
          noWrap
        >
          {postDetails.title}
        </Typography>
        <Chip
          label="Basic"
          variant="outlined"
          size="small"
          className={classes.chip}
        />
        <Typography
          style={{ position: "absolute", bottom: 40, color: "#ffffff" }}
        >
          12/12/2020
        </Typography>
      </Box>
      <Image src={bgPhoto} />
    </Card>
  );
}
