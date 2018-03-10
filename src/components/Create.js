import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import { store } from "../api/auth";
import SelectCategory from "./SelectCategory";
import CreatePostForm from "./forms/CreatePost.component";
import CreateCommentForm from "./forms/CreateComment.component";
import { safe } from "../util/guards";
const uuidv1 = require("uuid/v1");

const styles = theme => ({
  container: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "60%"
  },
  formControl: {
    margin: theme.spacing.unit,
    width: "100%"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {},
      comment: {},
      currentType: props.match.params.type === "post" ? "post" : "comment",
      error: "",
      success: null
    };
  }

  handleChange = event => {
    const { id: inputName, value } = event.target;
    const createType = this.state.currentType;
    this.setState(
      Object.assign({}, this.state, {
        [createType]: {
          ...this.state[createType],
          [inputName]: value
        },
        ...this.resetErrorsAndSuccess()
      })
    );
  };

  handleCatChange = event => {
    const { textContent } = event.currentTarget;
    const createType = this.state.currentType;
    this.setState(
      Object.assign({}, this.state, {
        [createType]: {
          ...this.state[createType],
          selectedCategory: textContent
        },
        ...this.resetErrorsAndSuccess()
      })
    );
  };

  handleSubmit = () => {
    const { user } = store.token;
    if (this.state.currentType === "post") {
      const { postTitle, postBody, selectedCategory } = this.state.post;
      if (!postTitle || !postBody || !selectedCategory) {
        this.setState({ error: "Complete all inputs" });
        return null;
      }
      this.props
        .addPost({
          id: uuidv1(),
          title: postTitle,
          body: postBody,
          category: selectedCategory,
          timestamp: Date.now(),
          author: "user"
        })
        .then(post =>
          this.setState({
            success: `Successfully added post ID: ${post.id}`,
            post: {}
          })
        )
        .catch(error => {
          console.log(error);
          this.setState({ error: `API error: ${error}` });
        });
    } else if (this.state.currentType === "comment") {
      const { commentBody } = this.state.comment;
      const { postId } = this.props.location.state;
      if (!commentBody) {
        this.setState({ error: "Complete all inputs" });
        return null;
      }
      this.props
        .addComment({
          id: uuidv1(),
          body: commentBody,
          timestamp: Date.now(),
          author: "user",
          parentId: this.props.location.state.postId
        })
        .then(comment => this.props.history.push(`/post/${postId}`))
        .catch(error => this.setState({ error: `API error: ${error}` }));
    }
  };

  resetErrorsAndSuccess() {
    return {
      error: "",
      success: null
    };
  }

  render() {
    if (this.state.currentType === "post") {
      return CreatePostForm({
        props: this.props,
        error: this.state.error,
        state: this.state.post,
        success: this.state.success,
        handleChange: this.handleChange,
        handleCatChange: this.handleCatChange,
        handleSubmit: this.handleSubmit
      });
    } else if (this.state.currentType === "comment") {
      if (safe(() => this.props.location.state.postId, false)) {
        return CreateCommentForm({
          props: this.props,
          error: this.state.error,
          state: this.state.comment,
          success: this.state.success,
          handleChange: this.handleChange,
          handleSubmit: this.handleSubmit
        });
      } else {
        this.props.history.push("/");
        return null;
      }
    }
  }
}

Create.propTypes = {
  classes: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired
};

export default withStyles(styles)(Create);
