import Container from "@material-ui/core/Container";
import React from "react";
import ListView from "../Home/ListView/ListView";

export default function Blogs() {
  return (
    <Container
      style={{
        paddingTop: 15,
      }}
    >
      <ListView />
    </Container>
  );
}
