import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Radio, { RadioGroup } from "material-ui/Radio";
import { FormLabel, FormControl, FormControlLabel } from "material-ui/Form";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  formControl: {
    margin: theme.spacing.unit * 3,
    flexDirection: "row"
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
    flexDirection: "row"
  }
});

class RadioButtonsGroup extends React.Component {
  state = {
    value: "none"
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.handleSortChange(value);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl
          component="fieldset"
          required
          className={classes.formControl}
        >
          <FormLabel component="legend">Sort method</FormLabel>
          <RadioGroup
            aria-label="sort by"
            name="sort methods"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel
              value="highest_votes"
              control={<Radio />}
              label="Highest Votes"
            />
            <FormControlLabel
              value="most_recent"
              control={<Radio />}
              label="Most Recent"
            />
            <FormControlLabel value="none" control={<Radio />} label="None" />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSortChange: PropTypes.func.isRequired
};

export default withStyles(styles)(RadioButtonsGroup);
