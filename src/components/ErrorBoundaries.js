import React, {Component} from 'react';
import {captureException, withScope} from '@sentry/browser';

class ErrorBoundaries extends Component {
  constructor(props) {
    super(props);
    this.state = {eventId: null};
  }

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    withScope((scope) => {
      scope.setExtras(errorInfo);
      const eventId = captureException(error);
      this.setState({eventId});
    });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorUi/>;
    }
    return this.props.children;
  }
}


export function ErrorUi() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'white'
    }}>
      未知错误
    </div>
  );
}

export default ErrorBoundaries;
