import { connect } from "react-redux";
import PostDetail from "../components/PostDetail";
import { fetchPostDetail } from "../actions/posts.actions";
import { fetchPostComments } from "../actions/comments.actions";
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
    fetchDetails: id => {
      return dispatch(fetchPostDetail(id));
    },
    fetchComments: id => dispatch(fetchPostComments(id))
  };
};

class PostDetailContainer extends Component {
  async componentDidMount() {
    const { posts, activePostId, fetchDetails, fetchComments } = this.props;
    const post = posts.byId[activePostId];
    if (!post) {
      await fetchDetails(activePostId);
      await fetchComments(activePostId);
    } else if (post && post.commentIds && post.commentIds.length === 0) {
      await fetchComments(activePostId);
    }
  }
  render() {
    const { posts, activePostId } = this.props;
    if (!posts.byId[activePostId]) {
      return null;
    }
    return <PostDetail {...this.props} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  PostDetailContainer
);
