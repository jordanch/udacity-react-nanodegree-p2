import { connect } from "react-redux";
import Posts from "../components/Posts";
import { fetchAllPosts } from "../actions/posts.actions";

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchPosts: () => {
      dispatch(fetchAllPosts());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
