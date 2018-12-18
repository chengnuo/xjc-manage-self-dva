import React, { Component } from 'react';
import { connect } from 'dva';

@connect()
class UserList extends Component {
  render() {
    return <div>用户列表</div>;
  }
}

export default UserList;
