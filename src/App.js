import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link
} from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import Posts from "./containers/Posts.container";
import CreateEntity from "./containers/Create.container";
import PostDetail from "./containers/PostDetail.container";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
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
                        <NavLink key={category.name} to={`/${category.path}`}>
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
              exact
              path="/:categoryName"
              render={props => {
                return <Posts {...props} />;
              }}
            />
            <Route
              path="/create/:type"
              render={props => <CreateEntity {...props} />}
            />
            <Route
              path="/edit/:type"
              render={props => <CreateEntity {...props} />}
            />
            {safe(() => {
              return Object.values(this.props.categories.byName).map(
                category => (
                  <Route
                    key={`${category.name}_route`}
                    exact
                    path={`/${category.path}/:postId`}
                    render={props => <PostDetail {...props} />}
                  />
                )
              );
            }, null)}
            {/* <Route
              exact
              path="/:categoryId/:postId"
              render={props => <PostDetail {...props} />}
            /> */}
            <Route
              path="/404"
              render={props => (
                <div>
                  <h1>404</h1>
                  <h2>Could not post post!</h2>
                </div>
              )}
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
