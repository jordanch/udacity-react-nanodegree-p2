import React from "react";
import Post from "../components/Post";
import Comment from "../components/Comment";
import PropTypes from "prop-types";
import { safe } from "../util/guards";
import { AppButton } from "../components/buttons";

const PostDetail = props => {
  const post = props.posts.byId[props.activePostId];
  const thisPostsComments = post.commentIds.map(id => props.comments.byId[id]);

  const navigateToCreateComment = (history, postId) => {
    // TODO: how the fuck does this not persist???
    history.push("/create/comment", { postId });
  };

  return (
    <div>
      <Post className="All-posts--post" type="detail" data={post} />
      <p>Comments</p>
      <AppButton
        text="+"
        colour="secondary"
        onClick={navigateToCreateComment.bind(null, props.history, post.id)}
      />
      {thisPostsComments.length === 0 && (
        <div>No comments have been added.</div>
      )}
      {thisPostsComments.map(comment => (
        <Comment data={comment} key={comment.id} />
      ))}
    </div>
  );
};

PostDetail.propTypes = {
  activePostId: PropTypes.string.isRequired,
  posts: PropTypes.object.isRequired,
  comments: PropTypes.object.isRequired
};

export default PostDetail;
