import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import classnames from "classnames";
import Card, {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions
} from "material-ui/Card";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import red from "material-ui/colors/red";
import FavoriteIcon from "material-ui-icons/Favorite";
import Comment from "material-ui-icons/Comment";
import ThumbUp from "material-ui-icons/ThumbUp";
import ThumbDown from "material-ui-icons/ThumbDown";

const styles = theme => ({
  card: {
    width: "100%"
  },
  media: {
    height: 194
  },
  flexGrow: {
    flex: "1 1 auto"
  }
});

const CommentCard = props => {
  const { classes } = props;

  return (
    <div className={props.className}>
      <Card className={classes.card}>
        <CardHeader
          title={props.data.author}
          subheader={props.data.timestamp}
        />
        <CardContent>
          <Typography component="p">{props.data.body}</Typography>
        </CardContent>
        <CardActions disableActionSpacing>
          <IconButton aria-label="Upvote">
            <ThumbUp color="action" />
          </IconButton>
          <IconButton aria-label="Downvote">
            <ThumbDown color="error" />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

CommentCard.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
    deleted: PropTypes.bool.isRequired,
    parentDeleted: PropTypes.bool.isRequired
  }).isRequired
};

export default withStyles(styles)(CommentCard);
