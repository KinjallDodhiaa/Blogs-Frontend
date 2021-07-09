import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import {
  Button,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  ButtonDropdown,
} from "reactstrap";
import { Modal } from "react-bootstrap"
import { Link } from 'react-router-dom';
import '../css/style.css'
import baseUrl from "../baseurl";


const Home = () => {

  const [userSignup, setUserSignup] = useState({});
  const [userSignin, setUserSignin] = useState({});
  const [userWriteBlogSignIn, setUserWriteBlogSignIn] = useState({});
  const [passwordShown, setPasswordShown] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);


  const myStorage = window.localStorage;

  console.log(userSignup);

  const [signUp, setsignUp] = useState(false);
  const handleCloseSignUp = () => setsignUp(false);
  const handlesignUp = () => setsignUp(true);

  const [signIn, setsignIn] = useState(false);
  const handleCloseSignIn = () => setsignIn(false)
  const handlesignIn = () => setsignIn(true);

  const [writeBlogSignIn, setwriteBlogSignIn] = useState(false);
  const handleCloseWriteBlogSignIn = () => setwriteBlogSignIn(false);
  const handleWriteBlogsignIn = () => setwriteBlogSignIn(true);


  const handleChangeSignup = (evt) => {
    setUserSignup({
      ...userSignup, [evt.target.name]: evt.target.value,
    });
  }

  const handleChangeSignin = (evt) => {
    setUserSignin({
      ...userSignin,
      [evt.target.name]: evt.target.value,
    });

  }

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
  }

  const submitSignin = async () => {
    try {
      const response = await axios.post(
        "https://kinjals-blog.herokuapp.com/users/login",
        {
          email: userSignin.email,
          password: userSignin.password,
        }
      );
      myStorage.setItem("token", response.headers.auth)
      myStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      console.log(response)

      window.location.replace("/");
      console.log(userSignin);
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
      myStorage.setItem("token", response.headers.auth)
      myStorage.setItem("user", JSON.stringify(response.data));

      console.log(response)

      window.location.replace("/addPosts");


      console.log(userWriteBlogSignIn);
    } catch (error) {
      console.log(error.response);

    }
  };


  // const togglePassword = () => {
  //   // When the handler is invoked
  //   // inverse the boolean state of passwordShown
  //   setPasswordShown(!passwordShown);
  // };

  const signOutOnClick = () => {
    localStorage.removeItem("token")
    window.location.replace("/");

  }



  return (
    <>
      <section className="section-1">
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

              {localStorage.getItem("token") ? (
                <div className="dropdown">
                  {localStorage.getItem("token") ? (
                    <button className="nav-link">
                      <i className="fas fa-user" id="user"></i>
                      {user && user.firstName}
                    </button>
                  ) : null}
                  <div className="dropdown-content">
                    <button onClick={signOutOnClick} className="nav-link">
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <button onClick={handlesignIn} className="nav-link">
                  Sign In
                </button>
              )}

              {/* {localStorage.getItem("token") ? (
                <ButtonDropdown
                  isOpen={dropdownOpen}
                  toggle={toggle}
                  className="dropButt"
                >
                  <DropdownToggle caret className="dropButt">
                    {localStorage.getItem("token") ? (
                      <button className="nav-link">
                        {user && user.firstName}
                      </button>
                    ) : null}
                  </DropdownToggle>
                  <DropdownMenu className="dropButt">
                    <DropdownItem header className="dropButt">
                      <button onClick={signOutOnClick} className="nav-link">
                        Sign Out
                      </button>
                    </DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              ) : (
                <button onClick={handlesignIn} className="nav-link">
                  Sign In
                </button>
              )} */}

              {/* {localStorage.getItem("token") ? (

                <button onClick={signOutOnClick} className="nav-link">
                  Sign Out
                </button>
              ) : (
                <button onClick={handlesignIn} className="nav-link">
                  Sign In
                </button>
              )} */}
            </nav>
          </div>
        </div>

        <div className="section-1-banner center">
          <p>Write your own amazing experience</p>
          {/* <Link to="/addPosts" className="link">
              Start here
            </Link> */}
          {/* <DropdownButton
            id="dropdown-basic-button"
            title="Register here"
            variant="secondary"
          >
            <Dropdown.Item className="dropdownButton" onClick={handlesignUp}>
              Sign Up
            </Dropdown.Item>
          </DropdownButton> */}

          <button className="register-button" onClick={handlesignUp}>
            Register here
          </button>

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
                onClick={handlesignIn}
              >
                Sign in here
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={signIn}
            onHide={handleCloseSignIn}
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
                onChange={handleChangeSignin}
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
                onChange={handleChangeSignin}
              />
              <Button
                variant="primary"
                className="modalButton"
                style={{ marginRight: "auto" }}
                onClick={submitSignin}
              >
                Sign In
              </Button>
            </Modal.Body>
            <Modal.Footer>
              <p className="modalP">Do not have an account?</p>
              <Button
                className="modalButton"
                variant="primary"
                onClick={handlesignIn}
              >
                Register here
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Modal for write blogs */}

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

          {/* <form>
            <p>Enter your name: </p>
            <input
              type='text'
              onChange={(event)=> localStorage.setItem("user", event.target.value)}/>
          </form> */}
        </div>

        <div className="imageshow">
          <img src="../images/blogpost-2.jpg" alt="backGroundImage" />
        </div>
      </section>
    </>
  );
};

export default Home;