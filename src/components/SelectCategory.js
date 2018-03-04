import React, { Component } from "react";
import PropTypes from "prop-types";
import IconButton from "material-ui/IconButton";
import Menu, { MenuItem } from "material-ui/Menu";
import MoreVertIcon from "material-ui-icons/MoreVert";

const ITEM_HEIGHT = 48;

class CategoryMenu extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    selected: null
  };

  handleClick = event => {
    this.setState({ selected: event.currentTarget });
  };

  handleClose = event => {
    this.props.onSelect(event);
    this.setState({ selected: null });
  };

  render() {
    const { selected } = this.state;
    const options = this.props.categories;

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={selected ? "long-menu" : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={this.state.selected}
          open={Boolean(selected)}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200
            }
          }}
        >
          {options.map(option => (
            <MenuItem
              key={option}
              selected={option === "Pyxis"}
              onClick={this.handleClose}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

CategoryMenu.propTypes = {
  categories: PropTypes.array.isRequired
};

export default CategoryMenu;
