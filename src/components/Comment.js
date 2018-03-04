//#region
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
import { voteComment } from "../actions/comments.actions";
import { connect } from "react-redux";
import Fav from "material-ui-icons/Favorite";
//#endregion

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
  const { classes, makeCommentVote } = props;
  const { author, timestamp, body, id, voteScore } = props.data;

  return (
    <div className={props.className}>
      <Card className={classes.card}>
        <CardHeader
          title={author}
          subheader={new Date(timestamp).toDateString()}
        />
        <CardContent>
          <Typography component="p">{body}</Typography>
        </CardContent>
        {/* todo: extract voting actions into separate component. */}
        <CardActions disableActionSpacing>
          <IconButton
            aria-label="Upvote"
            onClick={makeCommentVote.bind(null, id, "up")}
          >
            <ThumbUp color="action" />
          </IconButton>
          <IconButton
            aria-label="Downvote"
            onClick={makeCommentVote.bind(null, id, "down")}
          >
            <ThumbDown color="action" />
          </IconButton>
          <IconButton aria-label="Favourite score">
            <Fav color="error" />
            <span>{voteScore}</span>
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    makeCommentVote: (id, action) => {
      dispatch(voteComment(id, action));
    }
  };
};

export default withStyles(styles)(
  connect(null, mapDispatchToProps, null)(CommentCard)
);
