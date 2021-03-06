// mostly code from reactjs.org/docs/error-boundaries.html
import React, { Component } from 'react';
import { Link, Redirect } from '@reach/router';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    // step 1
    this.state = { hasError: false, redirect: false };
  }
  static getDerivedStateFromError() {
    // step 2
    return { hasError: true };
  }

  // step 3
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error', error, info);
  }

  // you can also move the code to componentDidCatch, makes more sense and more concise.
  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" noThrow></Redirect>;
    }
    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing. <Link to="/">Click here</Link>{' '}
          to back to the home page or wait five seconds.
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
