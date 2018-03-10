import React from "react";
import Input, { InputLabel } from "material-ui/Input";
import TextField from "material-ui/TextField";
import { FormControl } from "material-ui/Form";
import { AppButton } from "../buttons";

export default function CreateComment({
  props,
  error,
  state,
  success,
  handleChange,
  handleSubmit
}) {
  const { classes } = props;
  const { commentBody } = state;
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <FormControl className={classes.formControl}>
          <TextField
            label={"Comment text"}
            id="commentBody"
            fullWidth={true}
            value={commentBody ? commentBody : ""}
            onChange={handleChange}
            multiline={true}
            rows={10}
            type="text"
          />
        </FormControl>
        <div>{error && `Error: ${error}`}</div>
        <div className={classes.formControl}>
          <AppButton
            text="Add Comment"
            colour="secondary"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}