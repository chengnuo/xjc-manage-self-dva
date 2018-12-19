import React, { Component } from 'react';
import { connect } from 'dva';

@connect()
class TestListLayout extends Component {
  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}

export default TestListLayout;
