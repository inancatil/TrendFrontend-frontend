import React from "react";
import { default as CustomCard } from "./Card/Card";
import clsx from "clsx";
import { IBlogPost } from "../../../types";

interface IProps {
  blogPosts: IBlogPost[];
}

export default function GridView({ blogPosts }: IProps) {
  console.log(blogPosts);
  return (
    <section className={clsx("banners")}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-xs-12">
            <CustomCard postDetails={blogPosts[0]} />
          </div>
          <div className="col-md-6 col-xs-12">
            <CustomCard postDetails={blogPosts[1]} />
          </div>
          <div className="col-lg-4 col-md-6 col-xs-12">
            <CustomCard postDetails={blogPosts[2]} />
          </div>
          <div className="col-lg-4 col-md-6 col-xs-12">
            <CustomCard postDetails={blogPosts[3]} />
          </div>
          <div className="col-lg-4 col-md-6 col-xs-12">
            <CustomCard postDetails={blogPosts[4]} />
          </div>
        </div>
      </div>
    </section>
  );
}
