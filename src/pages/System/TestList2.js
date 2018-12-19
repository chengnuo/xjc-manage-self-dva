import React, { Component } from 'react';
import { connect } from 'dva';

@connect()
class TestList2 extends Component {
  render() {
    return <div>测试2</div>;
  }
}

export default TestList2;
