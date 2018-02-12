import { connect } from "react-redux";
import PostDetail from "../components/PostDetail";
import { updatePostBody, fetchAllPosts } from "../actions/posts.actions";
import React, { Component } from "react";

const mapStateToProps = (state, ownProps) => {
  return {
    activePostId: ownProps.match.params.postId,
    posts: state.posts,
    comments: state.comments
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateBody: userInput => {
      dispatch(updatePostBody(userInput));
    },
    fetchAllPosts: () => {
      dispatch(fetchAllPosts());
    }
  };
};

class PostDetailContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const {} = this.props;
    if (!posts.allIds || posts.allIds.length === 0) {
      // get post.
      // TODO: for now, fetch all posts.
      fetchAllPosts();
    }
  }
  render() {
    return <PostDetail {...this.props} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  PostDetailContainer
);
