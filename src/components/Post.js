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

const Post = props => {
  const { classes, data } = props;
  const { author, body, id } = data;

  return (
    <div className={props.className}>
      <Card className={classes.card}>
        <CardHeader
          title={<Link to={"/posts/1"}>{id}</Link>}
          subheader={Date.now()}
        />
        {props.type === "detail" && (
          <CardContent>
            <Typography component="p">{body}</Typography>
          </CardContent>
        )}
        <CardActions disableActionSpacing>
          <IconButton aria-label="Upvote">
            <ThumbUp color="action" />
          </IconButton>
          <IconButton aria-label="Downvote">
            <ThumbDown color="error" />
          </IconButton>
          <IconButton aria-label="Number of comments">
            2
            <Comment />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

Post.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.oneOf(["simple", "detail"]).isRequired,
  data: PropTypes.object
};

export default withStyles(styles)(Post);
