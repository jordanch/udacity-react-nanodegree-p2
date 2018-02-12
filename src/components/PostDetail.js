import React from "react";
import Post from "../components/Post";
import Comment from "../components/Comment";
import PropTypes from "prop-types";
import { safe } from "../util/guards";

const PostDetail = props => {
  if (!props.posts.allIds || props.posts.allIds.length === 0) {
    return null;
  }
  const post = props.posts.byId[props.activePostId];
  // the post may not yet have comments.
  const thisPostsComments = safe(
    () =>
      Object.keys(props.comments.byId)
        .filter(commentId => post.commentIds.includes(commentId))
        .map(commentId => props.comments.byId[commentId]),
    []
  );

  return (
    <div>
      <Post className="All-posts--post" type="detail" data={post} />
      {/* get this post's comments from store. */}
      <p>Comments</p>
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
