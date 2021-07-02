import React, { useRef, useState } from "react";
import baseUrl from "../baseurl";

import "../css/style.css";
import ReactQuill from "react-quill";
import { Link,useHistory } from "react-router-dom";
const axios = require("axios").default;


const AddPosts = (props) => {
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState("");
  let history = useHistory();

  const inputTitleRef = useRef();
  const inputContentRef = useRef();

  const handleBody = (e) => {
    console.log(e);
    inputContentRef.current.value = e;
  };

  const addPost = async (postTitle, postContent) => {

    console.log("add post log" + postContent);
    // TODO
    try {
      const response = await axios.post(
        baseUrl + "/posts/",
        {
          title: postTitle,
          content: postContent,
        },
        {
          headers: {
            auth: localStorage.getItem("token"),
          },
        }
      );
     await props.sendGetRequest({ title });
      console.log("response is :" + JSON.stringify(response));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const addPostsOnClick = async () => {
    // console.log(inputContentRef.current);
    try {
      
      await addPost(
        inputTitleRef.current.value,
        inputContentRef.current.value,
      );
      setTitle("");
      history.push('/showPosts')
    } catch (error) {
      console.log("U need to sign in" + error);
      if(!localStorage.getItem("token")){
      alert("Please sign in to write post");
      window.location.replace('/');
      }
      setErrors(error.response.data);
    }
    //  setContent("");
  };

  const signOutOnClick = () => {
    localStorage.removeItem("token")
  }


  return (
    <section className="section-1 addPost">
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
            <button onClick={signOutOnClick} className="nav-link">
              Sign Out
            </button>
          </nav>
        </div>
        <>
          <div className="blog-form">
            {errors && (
              <div className="errors">
                <h1>Try again.There are some errors below:</h1> <br />
                <ul>
                  {errors["errors"]
                    .map((error) => Object.entries(error))
                    .map((element) => (
                      <li>
                        {element[0][0]} - {element[0][1]}
                      </li>
                    ))}
                </ul>
              </div>
            )}

            <form>
              <h1>
              {localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).firstName} 
              </h1>


              <div className="form-group">
                <label htmlFor="inputTitle">Title</label>
                <input
                  ref={inputTitleRef}
                  type="text"
                  className="form-control border border-dark"
                  id="inputTitle"
                  border
                  border-dark
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputContent">Content</label>
                <ReactQuill
                  className="border border-dark"
                  placeholder="write something amazing..."
                  modules={AddPosts.modules}
                  formats={AddPosts.formats}
                  onChange={handleBody}
                  ref={inputContentRef}
                  id="inputContent"
                />
              </div>
              <button
                onClick={() => addPostsOnClick()}
                type="button"
                className="btn btn-primary mt-5 postButton"
              >
                <h3>Save</h3>
              </button>
            </form>
          </div>
        </>
        <div className="imagesAddPost">
          <img src="../images/bg-post.jpg" alt="backgroundImageToWritePost" />
        </div>
      </div>
    </section>
  );
};

AddPosts.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
AddPosts.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

/*
 * PropType validation
 */

export default AddPosts;
