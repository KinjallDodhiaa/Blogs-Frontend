import React from 'react';
import { Link } from 'react-router-dom';
import "../css/style.css";


const ShowPosts = (props) => {

  const signOutOnClick = () => {
    localStorage.removeItem("token")
  }


    return (
      <section className="section-2">
        <div className="main-container">
          <div className="navbar">
            <nav className="nav-list">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/showPosts" className="nav-link">
                Blogs
              </Link>
              <Link to="/addPosts" className="nav-link">
                Write Blog
              </Link>
              <button onClick={signOutOnClick} className="nav-link">Sign Out</button>

            </nav>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <h1 className="mb-5 mt-5">Your Story</h1>
              {props.show.length < 1 ? (
                <h2> No Blogs Yet</h2>
              ) : (
                props.show.map((post, index) => (
                  <>
                    <Link
                      key={index}
                      to={`/posts/${post._id}`}
                      className="link"
                    >
                      <h2>{post.title}</h2>
                    </Link>

                    <p>posted by {post.name}</p>
                  </>
                ))
              )}
            </div>
          </div>
          <div className="imagesShowPost">
            <img src="../images/blogpost-1.jpg" alt="backGroundImage" />
          </div>
        </div>
      </section>
    );
};

export default ShowPosts;