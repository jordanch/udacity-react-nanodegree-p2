import React from "react";
import Input, { InputLabel } from "material-ui/Input";
import TextField from "material-ui/TextField";
import { FormControl } from "material-ui/Form";
import { AppButton } from "../buttons";
import SelectCategory from "../SelectCategory";

export default function CreatePost({
  props,
  error,
  state,
  success,
  handleChange,
  handleCatChange,
  handleSubmit,
  handleEdit,
  handlePostDelete,
  type
}) {
  const { classes, categories } = props;
  const { postTitle, postBody, selectedCategory } = state;

  function deletePost() {
    handlePostDelete(state.postId);
  }
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="name-simple">Title</InputLabel>
          <Input
            id="postTitle"
            value={postTitle ? postTitle : ""}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            label={"Post text"}
            id="postBody"
            fullWidth={true}
            value={postBody ? postBody : ""}
            onChange={handleChange}
            multiline={true}
            rows={10}
            type="text"
          />
        </FormControl>
        {type === "create" && (
          <div>
            Choose category{" "}
            <div className={classes.formControl}>
              <SelectCategory
                categories={categories.allNames}
                onSelect={handleCatChange}
              />
            </div>
            <div className={classes.formControl}>
              Selected category: {selectedCategory}{" "}
              {!selectedCategory && "none"}
            </div>
          </div>
        )}
        <div>{error && `Error: ${error}`}</div>
        <div className={classes.formControl}>
          <AppButton
            text={type === "create" ? "Create Post" : "Update Post"}
            colour="secondary"
            onClick={type === "edit" ? handleEdit : handleSubmit}
          />
          <AppButton
            text={"Delete Post"}
            colour="default"
            onClick={deletePost}
          />
        </div>
        <div className={classes.formControl}>{success && success}</div>
      </div>
    </div>
  );
}
