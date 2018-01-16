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
        <CardHeader title="John Hunt" subheader="20/02/2016" />
        <CardContent>
          <Typography component="p">
            Lorem ipsum dolor amet cardigan wolf pork belly succulents.
            Chartreuse lomo cronut af, vexillologist taxidermy kale chips four
            loko. Cronut pork belly scenester thundercats sriracha succulents
            air plant gluten-free freegan chartreuse cornhole chia. Hoodie poke
            sustainable, godard messenger bag small batch migas scenester fanny
            pack. Cronut letterpress crucifix flannel heirloom artisan forage
            kogi hexagon kombucha tattooed selfies VHS thundercats. Man braid
            raclette fingerstache post-ironic, lumbersexual adaptogen mixtape
            hell of put a bird on it small batch hoodie vaporware. Plaid viral
            humblebrag taxidermy.
          </Typography>
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CommentCard);
