import React, { Component } from 'react';
import { connect } from 'dva';

@connect()
class RoleList extends Component {
  render() {
    return <div>角色列表</div>;
  }
}

export default RoleList;
