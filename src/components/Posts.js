import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withStyles } from "material-ui/styles";
import Post from "./Post";

const styles = theme => ({});

const Posts = props => {
  const { classes, posts } = props;

  return (
    <div className={props.className}>
      {Object.values(posts.byId).map(post => (
        <Post
          className="All-posts--post"
          type="simple"
          data={post}
          key={post.id}
        />
      ))}
    </div>
  );
};

Posts.propTypes = {
  classes: PropTypes.object.isRequired
};

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

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Posts)
);
