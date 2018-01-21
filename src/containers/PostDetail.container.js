import { connect } from "react-redux";
import PostDetail from "../components/PostDetail";
import { updatePostBody } from "../actions/posts.actions";

const mapStateToProps = (state, ownProps) => {
  return {
    activePostId: state.posts.previousActivePostId,
    postsById: state.posts.byId
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
