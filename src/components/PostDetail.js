import React from "react";
import Post from "../components/Post";
import Comment from "../components/Comment";
import PropTypes from "prop-types";

const PostDetail = props => {
  // get the post object.
  const post = props.postsById[props.activePostId];

  // window.setTimeout(
  //   () => props.updateBody({ body: "hello world", postId: post.id }),
  //   5000
  // );

  return (
    <div>
      <Post className="All-posts--post" type="detail" data={post} />
      <p>Comments</p>
      <Comment />
      <Comment />
    </div>
  );
};

PostDetail.propTypes = {
  activePostId: PropTypes.string.isRequired
};

export default PostDetail;
