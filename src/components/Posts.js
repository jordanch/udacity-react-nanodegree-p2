import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withStyles } from "material-ui/styles";
import Post from "./Post";

const styles = theme => ({});

const Posts = props => {
  const { byId } = props.posts;
  console.log(byId);
  return (
    <div className={props.className}>
      {Object.values(byId).map(post => (
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
  posts: PropTypes.shape({
    byId: PropTypes.object.isRequired,
    allIds: PropTypes.array.isRequired,
    previousActivePostId: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(Posts);
