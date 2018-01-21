import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import Post from "./components/Post";
import Posts from "./components/Posts";
import Comment from "./components/Comment";
import PostDetail from "./containers/PostDetail.container";

class App extends Component {
  render() {
    console.log(this);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

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
                return <Posts className="All-posts" posts={this.props.posts} />;
              }}
            />
            <Route path="/post/:postId" render={() => <PostDetail />} />
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
