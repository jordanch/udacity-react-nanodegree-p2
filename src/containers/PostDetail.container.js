import { connect } from "react-redux";
import PostDetail from "../components/PostDetail";
import { updatePostBody } from "../actions/posts.actions";

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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
