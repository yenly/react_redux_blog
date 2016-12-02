import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

// this object respresents configuration for each 3 fields
const FIELDS = {
  title: {
    type: 'input',
    label: 'Title for Post'
  },
  categories: {
    type: 'input',
    label: 'Enter some categories for this post'
  },
  content: {
    type: 'textarea',
    label: 'Post Contents'
  }
}

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

  renderField(fieldConfig, field) {
    // one fieldHelper object from Redux Form for each field created
    const fieldHelper = this.props.fields[field];

    return (
      <div className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`}>
        <label>{fieldConfig.label}</label>
        <fieldConfig.type key={fieldConfig.label} type="text" className="form-control" {...fieldHelper} />
        <div className="text-danger">
          {/* <-- example of JSX comment syntax
            .touched is prop from reduxForm - means if user touch this form
            below is example of ternary expression
            if title.touched is true, return title.error else return ''
          */}
          {fieldHelper.touched ? fieldHelper.error : ''}
        </div>
      </div>
    );
  }

  render() {
    // const handleSubmit = this.props.handleSubmit;
    // es6 shortcut syntax for above code
    // const title = this.props.fields.title is same as
    // fields: { title, categories, content } --> es6 syntax
    const { handleSubmit } = this.props;

    return (
      // handleSubmit calls action creator
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create A New Post</h3>
        {_.map(FIELDS, this.renderField.bind(this))}
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  // if(!values.title) {
  //   // key needs to match field names
  //   errors.title = 'Enter a username';
  // }
  //
  // if(!values.categories) {
  //   errors.categories = 'Enter categories';
  // }
  //
  // if(!values.content) {
  //   errors.content = 'Enter some content';
  // }

  // refactored: iterate each field and validate
  _.each(FIELDS, (type, field) => {
    if (!values[field]) {
      errors[field] = `Enter a ${field}`;
    }
  });

  return errors;
}

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps,
// 3rd is mapDispatchToProps (action creator)

export default reduxForm({
  form: 'PostsNewForm',
  fields: _.keys(FIELDS), // has to be array of strings; lodash helper keys
  validate
}, null, { createPost })(PostsNew);
