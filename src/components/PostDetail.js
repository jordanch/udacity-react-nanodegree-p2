const PostDetail = props => {
  const { match } = props;
  console.log(match, props);

  return (
    <div>
      <Post className="All-posts--post" type="simple" />
      <p>Comments</p>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
};

export default PostDetail;
