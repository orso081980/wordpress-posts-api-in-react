/*
 * Import remote dependancies
 */
import React, { useState, useEffect } from "react";
import Axios from "axios";

import Pagination from "./Pagination.js";

// CHANGE THIS TO YOUR WORDPRESS SITE URL.
const baseUrl = "https://www.higher-education-marketing.com";

export default function App() {
  // Track state for posts, current page and number of pages
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [nrofpages, setNumberofpage] = useState(1);

  // When the page number changes call the api for posts.
  useEffect(() => {
    Axios.get(baseUrl + "/wp-json/wp/v2/posts", {
      params: { page: page }
    }).then(response => {
      // Store the number of posible pages.
      setNumberofpage(response.headers["x-wp-totalpages"]);
      // Store the posts from the response.
      setPosts(response.data);
    });
  }, [page, setPosts]);

  return (
    <div className="posts-app__wrapper">
      <h1>Navigate Wp Rest Api Posts</h1>

      <Pagination
        nrOfPages={nrofpages}
        currentpage={page}
        onSelectPage={n => {
          setPage(n);
        }}
      />

      <div className="posts-app__post-list">
        {posts &&
          posts.length &&
          posts.map((post, index) => {
            return (
              <div key={post.id} className="posts-app__post">
                <h2>{post.title.rendered}</h2>
                <div
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
