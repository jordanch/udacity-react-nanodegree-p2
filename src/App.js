import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link
} from "react-router-dom";
import { connect } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import Post from "./components/Post";
import Posts from "./containers/Posts.container";
import Comment from "./components/Comment";
import CreateEntity from "./containers/Create.container";
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
                  <NavLink exact to="/">
                    <AppButton text="All" colour="primary" />
                  </NavLink>
                  {safe(() => {
                    return Object.values(this.props.categories.byName).map(
                      category => (
                        <NavLink
                          key={category.name}
                          to={`/categories/${category.path}`}
                        >
                          <AppButton text={category.name} colour="primary" />
                        </NavLink>
                      )
                    );
                  }, null)}
                </Toolbar>
              </AppBar>
            </nav>
            {/* HOME ROUTE */}
            <Route
              exact
              path="/"
              render={() => {
                return <Posts />;
              }}
            />
            <Route
              path="/categories/:categoryName"
              render={props => {
                return <Posts {...props} />;
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
            <Route
              path="/edit/:type"
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
