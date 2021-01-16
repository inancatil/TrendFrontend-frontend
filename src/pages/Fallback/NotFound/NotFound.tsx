import * as React from "react";

export interface INotFoundProps {}

export default function NotFound(props: INotFoundProps) {
  console.log("not found");
  return (
    <div>
      <p>Not Found</p>
    </div>
  );
}
