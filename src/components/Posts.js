import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withStyles } from "material-ui/styles";
import Post from "./Post";

const styles = theme => ({});

class Posts extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // make request for all posts from api.
    this.props.fetchPosts();
  }

  render() {
    const { byId, isFetchingPosts } = this.props.posts;

    if (isFetchingPosts) {
      return <IsLoading />;
    } else {
      return (
        <div className="All-posts">
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
    }
  }
}

Posts.propTypes = {
  posts: PropTypes.shape({
    byId: PropTypes.object.isRequired,
    allIds: PropTypes.array.isRequired
  }).isRequired,
  fetchPosts: PropTypes.func.isRequired
};

const IsLoading = () => {
  return <div>LOADING...</div>;
};

export default withStyles(styles)(Posts);
