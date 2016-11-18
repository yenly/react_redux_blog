import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
  static contextTypes = {
    // this gives us access to property called this.context.router
    router: PropTypes.object
  };

  onSubmit(props) {
    // createPost is an action creator that creates a promise as its payload.
    // whenever we call this action, this call will return the same promise
    // when promise is resolved, it means blog post is successfully created
    // perfect location to make sure navigation occurs.
    this.props.createPost(props)
      .then(() => {
        // blog post has been created, navigate the user to the index
        // we navigate by calling this.context.router.push with the
        // new path to navigate to.
        this.context.router.push('/');
      });
  }

  render() {
    // const handleSubmit = this.props.handleSubmit;
    // es6 shortcut syntax for above code
    // const title = this.props.fields.title is same as
    // fields: { title, categories, content } --> es6 syntax
    const { fields: { title, categories, content }, handleSubmit } = this.props;

    return (
      // handleSubmit calls action creator
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create A New Post</h3>
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="text-danger">
            {/* <-- example of JSX comment syntax
              .touched is prop from reduxForm - means if user touch this form
              below is example of ternary expression
              if title.touched is true, return title.error else return ''
            */}
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories} />
          <div className="text-danger">
            {categories.touched ? categories.error : ''}
          </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea type="text" className="form-control" {...content} />
          <div className="text-danger">
            {content.touched ? content.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if(!values.title) {
    // key needs to match field names
    errors.title = 'Enter a username';
  }

  if(!values.categories) {
    errors.categories = 'Enter categories';
  }

  if(!values.content) {
    errors.content = 'Enter some content';
  }

  return errors;
}

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps,
// 3rd is mapDispatchToProps (action creator)

export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost })(PostsNew);
