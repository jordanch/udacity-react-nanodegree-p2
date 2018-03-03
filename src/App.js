import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import Post from "./components/Post";
import Posts from "./containers/Posts.container";
import Comment from "./components/Comment";
import PostDetail from "./containers/PostDetail.container";
import * as api from "./api/api";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">All</Link>
                </li>
                <li>
                  <Link to="/create">Create</Link>
                </li>
              </ul>
            </nav>
            <Route
              exact
              path="/"
              render={() => {
                return <Posts />;
              }}
            />
            <Route
              path="/post/:postId"
              render={props => <PostDetail {...props} />}
            />
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch1: () => {
      dispatch();
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
