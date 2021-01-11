import React from "react";
import { IBlogPost } from "../../../types";

interface IProps {
  postDetails: IBlogPost;
}
export default function Article({ postDetails }: IProps) {
  return (
    <article className="blue-article">
      <div className="articles-header">
        <time dateTime="2016-10-11">12 hours ago</time>
        <span className="articles-header-tag-blue">Hot</span>
        <span className="articles-header-category">
          <a href="#" className="blue" title="">
            {postDetails.category ? postDetails.category.name : ""}
          </a>
        </span>
      </div>
      <div className="articles-content">
        <h1>
          <a href="blog_post.html" title="">
            {postDetails.title}
          </a>
        </h1>
        <p>{postDetails.content.replace(/<[^>]+>/g, "")}</p>
      </div>
      <div className="articles-footer">
        <ul className="articles-footer-info">
          <li>
            <a href="#" className="light-link" title="">
              <i className="pe-7s-comment"></i> 7 Response
            </a>
          </li>
          <li>
            <a href="#" className="light-link" title="">
              <i className="pe-7s-like"></i> 1221
            </a>
          </li>
        </ul>
        <a title="" className="read-more-btn" href="blog_post.html">
          Read more
        </a>
      </div>
    </article>
  );
}
