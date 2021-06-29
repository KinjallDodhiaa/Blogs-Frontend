import React from "react";
import { Link, useParams } from "react-router-dom";

import '../css/style.css'
const axios = require("axios").default;



const Posts = (props) => {
  const { id } = useParams();
  console.log(props);
  console.log(id);

  const foundPost = props.showPostDetails.find((post) => id == post._id);
  console.log(foundPost);

  const deletePostsOnClick = async (id) =>{
          try {
            axios
              .delete(`https://kinjals-blog.herokuapp.com/posts/${id}`, {
                headers: {
                  auth: localStorage.getItem("token"),
                },
              })
              .then((response) => props.sendGetRequest());
          } catch (error) {
            console.log(error);
          }

          console.log(id);

  }

  const signOutOnClick = () => {
    localStorage.removeItem("token")
  }



  return (
    <section className="post-section">
      {foundPost ? (
        <div className="container blogs-container">
          <div className="row">
            <div className="card text-center">
              <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                    <Link className="nav-link-post" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link-post" to="/showPosts">
                      Blogs
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link-post"
                      to="/addPosts"
                      tabindex="-1"
                      aria-disabled="true"
                    >
                      Write Blog
                    </Link>
                    <button onClick={signOutOnClick} className="nav-link-post">Sign Out</button>


                  </li>
                </ul>
              </div>
              <div className="card-body">
                <h1 className="card-title">{foundPost.title}</h1>
                <p
                  dangerouslySetInnerHTML={{ __html: foundPost.content }}
                  className="card-text"
                ></p>

                <Link className="p-5" to={`/editPosts/${foundPost._id}`}>
                  <button className="btn btn-primary mt-5 postButton">
                    Edit
                  </button>
                </Link>
                <Link to='/showPosts'>
                  <button
                    onClick={() => {
                      deletePostsOnClick(foundPost._id);
                    }}
                    className="btn btn-primary mt-5 postButton"
                  >
                    Delete
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default Posts;
