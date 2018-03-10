import { connect } from "react-redux";
import Create from "../components/Create";
import { createPost } from "../actions/posts.actions";

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addPost: post => {
      return dispatch(createPost(post));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
