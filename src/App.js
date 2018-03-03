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
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import PropTypes from "prop-types";
import { AppButton } from "./components/buttons";

const styles = {
  root: {
    flexGrow: 1
  }
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <nav>
              <AppBar position="static" color="default">
                <Toolbar>
                  <Link to="/">
                    <AppButton text="All" colour="primary" />
                  </Link>
                  <Link to="/create">
                    <AppButton text="Create" colour="secondary" />
                  </Link>
                </Toolbar>
              </AppBar>
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

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(App)
);
