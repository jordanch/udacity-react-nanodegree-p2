import { connect } from "react-redux";
import PostDetail from "./PostDetail";
import { actionCreator } from "actionCreatorPath";

const mapStateToProps = (state, ownProps) => {
  return {
    prop: state.prop
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch1: () => {
      dispatch(actionCreator);
    }
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    mergeProp: mergePropVal
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  PostDetail
);
