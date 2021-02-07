import React from "react";
import Chip, { ChipProps } from "@material-ui/core/Chip";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  link: {
    cursor: "pointer",
    marginRight: 15,
  },
});
interface IProps extends ChipProps {}

export default function CustomChip(props: IProps) {
  const classes = useStyles();
  return (
    <Link to={`/blog/?tag=${props.label}`}>
      <Chip {...props} className={classes.link} />
    </Link>
  );
}
