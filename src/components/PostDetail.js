import React from "react";
import Post from "../components/Post";
import Comment from "../components/Comment";
import PropTypes from "prop-types";
import { safe } from "../util/guards";

const PostDetail = props => {
  const post = props.posts.byId[props.activePostId];
  const thisPostsComments = post.commentIds.map(id => props.comments.byId[id]);

  return (
    <div>
      <Post className="All-posts--post" type="detail" data={post} />
      {/* get this post's comments from store. */}
      <p>Comments</p>
      {thisPostsComments.length === 0 && (
        <span>No comments have been added.</span>
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
