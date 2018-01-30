import React from "react";
import Post from "../components/Post";
import Comment from "../components/Comment";
import PropTypes from "prop-types";

const PostDetail = props => {
  const post = props.posts.byId[props.activePostId];
  const thisPostComments = Object.keys(props.comments.byId)
    .filter(commentId => post.commentIds.includes(commentId))
    .map(commentId => props.comments.byId[commentId]);

  // get this posts comments from store.
  return (
    <div>
      <Post className="All-posts--post" type="detail" data={post} />
      <p>Comments</p>
      {thisPostComments.map(comment => (
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
