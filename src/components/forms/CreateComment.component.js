import React from "react";
import TextField from "material-ui/TextField";
import { FormControl } from "material-ui/Form";
import { AppButton } from "../buttons";

export default function CreateComment({
  props,
  error,
  state,
  success,
  handleChange,
  handleSubmit,
  handleEditSubmit,
  handleCommentDelete,
  type
}) {
  function deleteComment() {
    handleCommentDelete(state.commentId);
  }

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
            onClick={type === "edit" ? handleEditSubmit : handleSubmit}
          />
          {type === "edit" && (
            <AppButton
              text={"Delete Comment"}
              colour="default"
              onClick={deleteComment}
            />
          )}
        </div>
      </div>
    </div>
  );
}
