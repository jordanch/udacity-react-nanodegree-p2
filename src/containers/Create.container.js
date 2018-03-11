import { connect } from "react-redux";
import Create from "../components/Create";
import {
  createPost,
  updatePost as putPost,
  deletePost as delPost
} from "../actions/posts.actions";
import {
  createComment,
  updateComment as putComment,
  deleteComment as delComment
} from "../actions/comments.actions";

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
    },
    updateComment: details => {
      return dispatch(putComment(details));
    },
    deleteComment: id => {
      return dispatch(delComment(id));
    },
    deletePost: id => {
      return dispatch(delPost(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
