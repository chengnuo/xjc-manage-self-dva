import React, { Component } from 'react';
import { connect } from 'dva';

@connect()
class TestList extends Component {
  render() {
    return <div>测试</div>;
  }
}

export default TestList;
