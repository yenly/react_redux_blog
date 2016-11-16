import React, { Component } from 'react';
import { connect } from 'react-redux';
// no longer needed when using the short cut below
// import { bindActionCreators } from 'redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router';

class PostsIndex extends Component {
  // componentWillMount() is a lifecycle method
  // only called once at first render of app, not later renders
  componentWillMount() {
    this.props.fetchPosts(); // calls our action creator
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary">
            Add a Post
          </Link>
        </div>
        List of blog posts
      </div>
    );
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchPosts }, dispatch);
// }

// export default connect(null, mapDispatchToProps)(PostsIndex);
// short cut using es6 way to pass in object
export default connect(null, { fetchPosts })(PostsIndex);
