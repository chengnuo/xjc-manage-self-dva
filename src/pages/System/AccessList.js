import React, { Component } from 'react';
import { connect } from 'dva';

@connect()
class AccessList extends Component {
  render() {
    return <div>权限列表</div>;
  }
}

export default AccessList;
