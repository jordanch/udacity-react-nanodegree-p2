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
  handleChange,
  handleCatChange,
  handleSubmit
}) {
  const { classes, categories } = props;
  const { title, body, selectedCategory } = state;
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
            id="postBody"
            fullWidth={true}
            value={body}
            onChange={handleChange}
            multiline={true}
            rows={10}
            type="text"
          />
        </FormControl>
        <div>Selected category: {selectedCategory}</div>
        Choose category{" "}
        <SelectCategory
          categories={categories.allNames}
          onSelect={handleCatChange}
        />
        <div>Error: {error}</div>
        <AppButton
          text="Create Post"
          colour="secondary"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
