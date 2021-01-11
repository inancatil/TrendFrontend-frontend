import React from "react";
import { useSelector } from "../../../store";
import { IBlogPost } from "../../../types";
import Article from "./Article";
import "./style.css";

export default function ListView() {
  const blogPosts = useSelector((state) => state.blogPostReducer);

  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-xs-12">
            <section className="articles">
              {blogPosts.map((post: IBlogPost) => (
                <Article postDetails={post} />
              ))}

              <nav aria-label="...">
                <a title="" href="" className="btn-small-white pagination-back">
                  Back
                </a>
                <ul className="pagination">
                  <li className="page-item active">
                    <a className="page-link" href="#">
                      1 <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item page-item-more">
                    <a className="page-link" href="#">
                      ...
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      25
                    </a>
                  </li>
                </ul>
                <a
                  title=""
                  href="blog_post.html"
                  className="btn-small-white pagination-next"
                >
                  Next
                </a>
              </nav>
            </section>
          </div>

          <div className="aside-blocks col-lg-4 col-xs-12"></div>
        </div>
      </div>
    </main>
  );
}
