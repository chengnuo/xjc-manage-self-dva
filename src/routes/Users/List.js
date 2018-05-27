import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

@connect(({ users, loading }) => ({
  users,
}))
export default class List extends PureComponent {
  componentDidMount() {
    console.log('this',this)
    this.props.dispatch({
      type: 'users/fetchQueryUsers',
    });
  }
  render() {

    return (
      <div>用户列表</div>
    );
  }
}
