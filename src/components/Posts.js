import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Post from "./Post";
import RadioGroup from "../components/RadioButtons.component";

const styles = theme => ({});

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: ""
    };
  }

  componentDidMount() {
    // make request for all posts from api.
    const { posts } = this.props;
    if (posts.hasFecthedAllPosts === false) {
      this.props.fetchPosts();
    }
  }

  sort(posts) {
    const { sortBy } = this.state;
    if (sortBy === "highest_votes") {
      return posts.slice().sort((a, b) => {
        if (a.voteScore > b.voteScore) {
          return -1;
        } else if (a.voteScore < b.voteScore) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (sortBy === "most_recent") {
      return posts.slice().sort((a, b) => {
        if (a.timestamp > b.timestamp) {
          return -1;
        } else if (a.timestamp < b.timestamp) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      return posts;
    }
  }

  handleSortChange = sortDescriptor => {
    this.setState({ sortBy: sortDescriptor });
  };

  render() {
    const { byId, isFetchingPosts } = this.props.posts;

    if (isFetchingPosts) {
      return <IsLoading />;
    } else {
      const categoryName =
        this.props.match && this.props.match.params
          ? this.props.match.params.categoryName
          : null;

      const matchedPosts = Object.values(byId).filter(
        post => (categoryName ? post.category === categoryName : true)
      );
      return (
        <div className="All-posts">
          <div>
            <RadioGroup handleSortChange={this.handleSortChange} />
          </div>
          {this.sort(matchedPosts).map(post => (
            <Post
              className="All-posts--post"
              type="simple"
              data={post}
              key={post.id}
            />
          ))}
          {matchedPosts.length === 0 && "No posts in category!"}
        </div>
      );
    }
  }
}

Posts.propTypes = {
  posts: PropTypes.shape({
    byId: PropTypes.object.isRequired,
    allIds: PropTypes.array.isRequired
  }).isRequired,
  fetchPosts: PropTypes.func.isRequired
};

const IsLoading = () => {
  return <div>LOADING...</div>;
};

export default withStyles(styles)(Posts);
