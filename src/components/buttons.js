import React from "react";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import PropTypes from "prop-types";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

function GenericButton(props) {
  const { classes, text, colour } = props;
  return (
    <Button variant="raised" color={colour} className={classes.button}>
      {text}
    </Button>
  );
}

GenericButton.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  colour: PropTypes.string.isRequired
};

export const AppButton = withStyles(styles)(GenericButton);
