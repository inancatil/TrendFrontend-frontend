import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Categories from "./ListViewCards/Categories";
import LastUpdatedCard from "./ListViewCards/LastUpdatedCard";
import PersonalInfoCard from "./PersonalInfoCard";

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    marginBottom: theme.spacing(3),
  },
}));

export default function SideCol() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.card}>
        <PersonalInfoCard
          name={"Meltem Gürsoy"}
          job={"Frontend Developer"}
          linkedInUrl={"meltem linkedin url"}
          gitUrl={"meltem git url"}
          cvUrl={"meltem cv url"}
        />
      </div>

      <div className={classes.card}>
        <PersonalInfoCard
          name={"İnanç Atıl"}
          job={"Frontend Developer"}
          linkedInUrl={"inanc linkedin url"}
          gitUrl={"inanc git url"}
          cvUrl={"inanc cv url"}
        />
      </div>

      <div className={classes.card}>
        <Categories />
      </div>

      <div className={classes.card}>
        <LastUpdatedCard />
      </div>
    </div>
  );
}
