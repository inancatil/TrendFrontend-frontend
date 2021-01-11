import React from "react";
import bgPhoto from "../../../../assets/images/photo1.jpg";
import { IBlogPost } from "../../../../types";
import "./Card.css";

interface IProps {
  postDetails: IBlogPost;
}
export default function Card({ postDetails }: IProps) {
  return (
    <div className="banner-wrapper">
      <a href="blog_post.html" title="Leveling up in CSS">
        <div className="banner-wrapper-content">
          <h1 className="h2">{postDetails.title}</h1>
          {postDetails.category && (
            <span className="category-tag category-tag-white">
              {postDetails.category.name}
            </span>
          )}
          <time dateTime="2016-01-18" className="">
            January 18, 2016
          </time>
        </div>
      </a>
      <img className="img-fluid" src={bgPhoto} alt="Test" />
    </div>
  );
}
