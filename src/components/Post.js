//#region imps
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import Card, { CardHeader, CardContent, CardActions } from "material-ui/Card";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import Comment from "material-ui-icons/Comment";
import ThumbUp from "material-ui-icons/ThumbUp";
import ThumbDown from "material-ui-icons/ThumbDown";
import Fav from "material-ui-icons/Favorite";
import { votePost } from "../actions/posts.actions";
import { connect } from "react-redux";
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

const Post = props => {
  const { classes, data, makePostVote } = props;
  const {
    author,
    body,
    id,
    timestamp,
    title,
    commentCount,
    category,
    voteScore
  } = data;
  const subTitle = (
    <div>
      <p>{new Date(timestamp).toDateString()}</p>
      <p>{category}</p>
    </div>
  );

  return (
    <div className={props.className}>
      <Card className={classes.card}>
        <CardHeader
          title={<Link to={`/${category}/${id}`}>{title}</Link>}
          subheader={subTitle}
        />
        <span>
          {" "}
          <small>by {author}</small>
        </span>
        {props.type === "detail" && (
          <CardContent>
            <Typography component="p">{body}</Typography>
          </CardContent>
        )}
        <CardActions disableActionSpacing>
          <IconButton
            aria-label="Upvote"
            onClick={makePostVote.bind(null, id, "up")}
          >
            <ThumbUp color="action" />
          </IconButton>
          <IconButton
            aria-label="Downvote"
            onClick={makePostVote.bind(null, id, "down")}
          >
            <ThumbDown color="action" />
          </IconButton>
          <IconButton aria-label="Favourite score">
            <Fav color="error" />
            <span>{voteScore}</span>
          </IconButton>
          <IconButton aria-label="Number of comments">
            {commentCount}
            <Link to={`/${category}/${id}`}>
              <Comment />
            </Link>
          </IconButton>
          <Link
            to={{ pathname: "/edit/post", state: { post: data } }}
            style={{
              marginLeft: "10px"
            }}
          >
            edit
          </Link>
        </CardActions>
      </Card>
    </div>
  );
};

Post.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.oneOf(["simple", "detail"]).isRequired,
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
    deleted: PropTypes.bool.isRequired,
    commentCount: PropTypes.number.isRequired
  }).isRequired
};

//#region exports and store connect
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    makePostVote: (id, action) => {
      dispatch(votePost(id, action));
    }
  };
};

export default withStyles(styles)(
  connect(null, mapDispatchToProps, null)(Post)
);
//#endregion
