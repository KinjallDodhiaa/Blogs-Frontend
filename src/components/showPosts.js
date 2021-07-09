import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/style.css";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import baseUrl from "../baseurl";

const ShowPosts = (props) => {
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

  const signOutOnClick = () => {
    localStorage.removeItem("token");
  };

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
            {localStorage.getItem("token") ? (
              <Link to="/addPosts" className="nav-link">
                Write Blog
              </Link>
            ) : (
              <button onClick={handleWriteBlogsignIn} className="nav-link">
                Write Blog
              </button>
            )}
            <button onClick={signOutOnClick} className="nav-link">
              Sign Out
            </button>
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
                  <Link key={index} to={`/posts/${post._id}`} className="link">
                    <h2>{post.title}</h2>
                  </Link>

                  <p>posted by {post.userId.firstName}</p>
                </>
              ))
            )}
          </div>
        </div>

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

        <div className="imagesShowPost">
          <img src="../images/blogpost-1.jpg" alt="backGroundImage" />
        </div>
      </div>
    </section>
  );
};

export default ShowPosts;
