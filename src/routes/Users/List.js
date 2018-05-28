import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Table, Icon, Divider } from 'antd';


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

    const { list = [], total = 0 } = this.props.users;

    const columns = [{
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <div>{text}</div>
      ),
    }, {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>{text}</div>
      ),
    }, {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      render: (text, record) => (
        <div>{text}</div>
      ),
    },{
      title: '更新时间',
      dataIndex: 'updated_time',
      key: 'updated_time',
      render: (text, record) => (
        <div>{text}</div>
      ),
    },{
      title: '创建时间',
      dataIndex: 'created_time',
      key: 'created_time',
      render: (text, record) => (
        <div>{text}</div>
      ),
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <div>
          <a href="javascript:;">新增</a>
          <Divider type="vertical" />
          <a href="javascript:;">编辑</a>
          <Divider type="vertical" />
          <a href="javascript:;">删除</a>
        </div>
      ),
    }];

    return (
      <div>
        {/* 用户列表 */}
        <Table columns={columns} dataSource={list} rowKey='id' />
      </div>
    );
  }
}
