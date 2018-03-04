import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Input, { InputLabel } from "material-ui/Input";
import TextField from "material-ui/TextField";
import { FormControl, FormHelperText } from "material-ui/Form";
import { AppButton } from "../components/buttons";

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
    super();
    this.state = {
      post: {},
      comment: {},
      currentType: props.match.params.type === "post" ? "post" : "comment"
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
        }
      })
    );
  };
  render() {
    if (this.state.currentType === "post") {
      return CreatePost({
        props: this.props,
        state: this.state.post,
        onChange: this.handleChange
      });
    } else {
      return null;
    }
  }
}

Create.propTypes = {
  classes: PropTypes.object.isRequired
};

function CreatePost({ props, state, handleChange }) {
  const { classes } = props;
  const { title, body, currentCategory, categories } = state;
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="name-simple">Title</InputLabel>
          <Input id="postTitle" value={title} onChange={handleChange} />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            label={"Post text"}
            id="postTitle"
            fullWidth={true}
            value={body}
            onChange={handleChange}
            multiline={true}
            rows={10}
            type="text"
          />
        </FormControl>
        <AppButton text="Create Post" colour="secondary" />
      </div>
    </div>
  );
}

export default withStyles(styles)(Create);
