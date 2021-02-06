import React from "react";
import Categories from "./Categories";
import PersonalInfoCard from "./PersonalInfoCard/PersonalInfoCard";

export default function SideCol() {
  return (
    <div>
      <PersonalInfoCard
        name={"Meltem Gürsoy"}
        job={"Frontend Developer"}
        linkedInUrl={"meltem linkedin url"}
        gitUrl={"meltem git url"}
        cvUrl={"meltem cv url"}
      />
      <PersonalInfoCard
        name={"İnanç Atıl"}
        job={"Frontend Developer"}
        linkedInUrl={"inanc linkedin url"}
        gitUrl={"inanc git url"}
        cvUrl={"inanc cv url"}
      />
      <Categories />
    </div>
  );
}
