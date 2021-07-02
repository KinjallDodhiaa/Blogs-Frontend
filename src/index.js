import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/react-quill/dist/quill.snow.css";
import baseUrl from './baseurl'

import Home from './components/home';
import AddPosts from './components/addPosts';
import Posts from './components/posts';
import ShowPosts from './components/showPosts';
import EditPosts from './components/editPosts';

const axios = require("axios").default;


const App = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts);

  useEffect(() => {
    sendGetRequest();
  }, []);

  const sendGetRequest = async () => {
    try {
      const response = await axios.get(baseUrl + "/posts");
      setPosts(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  }; 

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/addPosts">
          <AddPosts sendGetRequest={sendGetRequest} />
        </Route>
        <Route path="/showPosts">
          <ShowPosts show={posts} sendGetRequest={sendGetRequest} />
        </Route>

        <Route path="/posts/:id">
          <Posts showPostDetails={posts} sendGetRequest={sendGetRequest} />
        </Route>
        <Route path="/editPosts/:id">
          {posts && <EditPosts edit={posts} sendGetRequest={sendGetRequest} />}
        </Route>
      </Switch>
      {/* <p> Thank you for visiting, goodbye {localStorage.getItem("user")}</p> */}
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));