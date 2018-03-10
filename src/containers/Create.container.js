import { connect } from "react-redux";
import Create from "../components/Create";
import { createPost, updatePost as putPost } from "../actions/posts.actions";
import { createComment } from "../actions/comments.actions";

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addPost: post => {
      return dispatch(createPost(post));
    },
    addComment: comment => {
      return dispatch(createComment(comment));
    },
    updatePost: details => {
      return dispatch(putPost(details));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
