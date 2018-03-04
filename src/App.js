import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import Post from "./components/Post";
import Posts from "./containers/Posts.container";
import Comment from "./components/Comment";
import CreateEntity from "./components/Create";
import PostDetail from "./containers/PostDetail.container";
import * as api from "./api/api";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import PropTypes from "prop-types";
import { AppButton } from "./components/buttons";
import { fetchAllCategories } from "./actions/categories.actions";
import { safe } from "./util/guards";

const styles = {
  contents: {
    height: "100%",
    width: "100%"
  }
};

class App extends Component {
  componentDidMount() {
    this.props.fetchAllCategories();
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div className={this.props.classes.contents}>
            <nav>
              <AppBar position="static" color="default">
                <Toolbar>
                  <Link to="/create/post">
                    <AppButton text="Create Post" colour="secondary" />
                  </Link>
                  <Link to="/">
                    <AppButton text="All" colour="primary" />
                  </Link>
                  {safe(() => {
                    return Object.values(this.props.categories.byName).map(
                      category => (
                        <AppButton
                          key={category.name}
                          text={category.name}
                          colour="primary"
                        />
                      )
                    );
                  }, null)}
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
            <Route
              path="/create/:type"
              render={props => <CreateEntity {...props} />}
            />
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchAllCategories: () => {
      dispatch(fetchAllCategories());
    }
  };
};

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(App)
);
