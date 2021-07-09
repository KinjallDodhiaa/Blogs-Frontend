import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import baseUrl from "../baseurl";

import "../css/style.css";
const axios = require("axios").default;

const Posts = (props) => {
  const [userSignup, setUserSignup] = useState({});
  const [userWriteBlogSignIn, setUserWriteBlogSignIn] = useState({});
  const [passwordShown, setPasswordShown] = useState(false);

  const myStorage = window.localStorage;

  const [signUp, setsignUp] = useState(false);
  const handleCloseSignUp = () => setsignUp(false);
  const handlesignUp = () => setsignUp(true);

  const [writeBlogSignIn, setwriteBlogSignIn] = useState(false);
  const handleCloseWriteBlogSignIn = () => setwriteBlogSignIn(false);
  const handleWriteBlogsignIn = () => setwriteBlogSignIn(true);

  const handleChangeSignup = (evt) => {
    setUserSignup({
      ...userSignup,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleChangeWriteBlogSignin = (evt) => {
    setUserWriteBlogSignIn({
      ...userWriteBlogSignIn,
      [evt.target.name]: evt.target.value,
    });
  };

  const submitSignup = async () => {
    try {
      await axios
        .post("https://kinjals-blog.herokuapp.com/users", userSignup)
        .then((response) => {
          myStorage.setItem("token", response.headers.auth);
          myStorage.setItem("user", JSON.stringify(response.data));
          console.log("signup" + response.data.firstName);
        });
      window.location.replace("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  const submitWriteBlogSignin = async () => {
    try {
      const response = await axios.post(
        "https://kinjals-blog.herokuapp.com/users/login",
        {
          email: userWriteBlogSignIn.email,
          password: userWriteBlogSignIn.password,
        }
      );
      myStorage.setItem("token", response.headers.auth);
      myStorage.setItem("user", JSON.stringify(response.data));

      console.log(response);

      window.location.replace("/addPosts");

      console.log(userWriteBlogSignIn);
    } catch (error) {
      console.log(error.response);
    }
  };


  const { id } = useParams();
  console.log(props);
  console.log(id);

  const foundPost = props.showPostDetails.find((post) => id == post._id);
  console.log(foundPost);

  const deletePostsOnClick = async (id) => {
    try {
      axios
        .delete(`https://kinjals-blog.herokuapp.com/posts/${id}`, {
          headers: {
            auth: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          props.sendGetRequest();
          response.data === "notauth"
            ? alert("Not authorize to delete others post")
            : window.location.replace("/showPosts");
        });
    } catch (error) {
      console.log(error);
    }

    console.log(id);
  };

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
                    {localStorage.getItem("token") ? (
                      <Link to="/addPosts" className="nav-link">
                        Write Blog
                      </Link>
                    ) : (
                      <button
                        onClick={handleWriteBlogsignIn}
                        className="nav-link"
                      >
                        Write Blog
                      </button>
                    )}
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
                  <button
                    onClick={() => {
                      deletePostsOnClick(foundPost._id);
                    }}
                    className="btn btn-primary mt-5 postButton"
                  >
                    Delete
                  </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Modal for sign up */}
      <Modal
        show={signUp}
        onHide={handleCloseSignUp}
        backdrop="static"
        keyboard={false}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="modalTitle">Sign up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="firstName" className="labelClass">
            First Name:
          </label>
          <input
            className="inputClass"
            id="firstName"
            name="firstName"
            placeholder="enter your first name"
            onChange={handleChangeSignup}
          />

          <label htmlFor="email" className="labelClass">
            Email:
          </label>
          <input
            className="inputClass"
            id="email"
            name="email"
            placeholder="enter your email"
            onChange={handleChangeSignup}
          />
          <label htmlFor="password" className="labelClass">
            Password:
          </label>
          <input
            type={passwordShown ? "text" : "password"}
            className="inputClass"
            id="password"
            name="password"
            placeholder="enter your password"
            onChange={handleChangeSignup}
          />
          {/* <i class="fas fa-eye-slash"></i> */}
          <label htmlFor="password" className="labelClass">
            Confirm Password:
          </label>
          <input
            type={passwordShown ? "text" : "password"}
            name="confirmPassword"
            id="password"
            className="inputClass"
            placeholder="confirm password"
            onChange={handleChangeSignup}
          />
          {/* <button onClick={togglePassword}>Show Password</button> */}
          <Button className="mt-5 modalButton" onClick={submitSignup}>
            Sign up
          </Button>
        </Modal.Body>

        <Modal.Footer>
          <p className="modalP">Already have an account?</p>
          <Button
            className="modalButton"
            variant="primary"
            onClick={handleChangeWriteBlogSignin}
          >
            Sign in here
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={writeBlogSignIn}
        onHide={handleCloseWriteBlogSignIn}
        backdrop="static"
        keyboard={false}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="modalTitle mb-4">Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
          <label htmlFor="email" className="labelClass">
            Email:
          </label>
          <input
            className="inputClass"
            id="email"
            name="email"
            placeholder="enter your email"
            onChange={handleChangeWriteBlogSignin}
          />
          <label htmlFor="password" className="labelClass">
            Password:
          </label>
          <input
            type={passwordShown ? "text" : "password"}
            className="inputClass"
            id="password"
            name="password"
            placeholder="enter your password"
            onChange={handleChangeWriteBlogSignin}
          />
          <Button
            to="/addPosts"
            variant="primary"
            className="modalButton"
            style={{ marginRight: "auto" }}
            onClick={submitWriteBlogSignin}
          >
            Sign In
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <p className="modalP">Do not have an account?</p>
          <Button
            className="modalButton"
            variant="primary"
            onClick={handlesignUp}
          >
            Sign up here
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default Posts;
