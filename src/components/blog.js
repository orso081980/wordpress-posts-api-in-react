import React, { useState, useEffect } from "react";
import Axios from "axios";

const Fragment = React.Fragment;

const rootURL = 'https://www.higher-education-marketing.com';

const config = {
  rootURL: rootURL,
  taskRoute: `${rootURL}/wp-json/wp/v2/posts`,
};


const algpagination = (c, m) => {
    var current = c,
        last = m,
        delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;

    for (let i = 1; i <= last; i++) {
        if (i === 1 || i === last || i >= left && i < right) {
            range.push(i);
        }
    }

    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        l = i;
    }

    return rangeWithDots;

}


const ReturnBlog = () => {
  // Track state for posts, current page and number of pages
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [nrofpages, setNumberofpage] = useState(1);

  // When the page number changes call the api for posts.
  useEffect(() => {
    Axios.get(config.taskRoute, {
      params: { page: page }
    }).then(response => {
      // Store the number of posible pages.
      setNumberofpage(response.headers["x-wp-totalpages"]);
      // Store the posts from the response.
      setPosts(response.data);
    });
  }, [page, setPosts]);
  //console.log(nrofpages);
  // Event handler: Decrease page count no lower then 1.
  const handlePrevPage = () => setPage(page - 1 ? page - 1 : 1);
  // Event handler: Increase page count no higher then nrofpages.
  const handleNextPage = () => setPage(page < nrofpages ? page + 1 : nrofpages);


  let pagination = [];
  // Show a button to set the current page for each page.
  for( var p = 1; p <= nrofpages; p++ ) {
    // console.log(`Selected page ${p}:`, algpagination(p, nrofpages));
    let page = p;
    pagination.push( <button key={p} onClick={ () => { setPage( page ) } }>{ p }</button> );
  }
  //console.log(pagination);

  return (
    <div className="posts-app__wrapper">
      <h1>Navigate Wp Rest Api Posts</h1>

      <div className="posts-app__post-nav">
        { pagination }
        <button onClick={handlePrevPage}>Newer posts</button>
        <p>
          Page {page} of {nrofpages}
        </p>
        <button onClick={handleNextPage}>Older posts</button>
      </div>

      <div className="posts-app__post-list">
        {posts && posts.length && posts.map((post, index) => {
            return (
              <div key={post.id} className="posts-app__post">
                <h2>{post.title.rendered}</h2>
                <div
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
                <a rel="noopener noreferrer" href={post.link} target="_blank">
                  Read post
                </a>
              </div>
            );
          })}
      </div>
    </div>
  );
}

const ReturnWordpress = () => {
  return (
    <Fragment>
    <ReturnBlog />
    </Fragment>
    );
}

export default ReturnWordpress;    
