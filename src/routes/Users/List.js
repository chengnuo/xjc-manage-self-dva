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
    this.fetchQueryUsers({
      pageCurrent: 1,
      pageSize: 10,
    });
  }
  get pagination() {

    const { pageCurrent, pageSize, total = 0 } = this.props.users;

    const self = this;
    const pagination = {
      showTotal: total => `共 ${total} 条`,
      total: total || 0,
      current: pageCurrent,
      pageSize,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '50', '100'],
      onShowSizeChange: self.handleShowSizeChange.bind(self),
      onChange: self.handleChange.bind(self)
    };
    return pagination
  }
  fetchQueryUsers(payload) {
    this.props.dispatch({
      type: 'users/fetchQueryUsers',
      payload: Object.assign({},{
        pageCurrent: 1,
        pageSize: 10,
      },payload),
    });
  }
  // pageSize 变化的回调
  handleShowSizeChange(pageCurrent, pageSize) {
    this.fetchQueryUsers({
      pageCurrent,
      pageSize,
    });
  }
  // 点击当前页面
  handleChange(pageCurrent) {
    this.fetchQueryUsers({
      pageCurrent,
    });
  }

  render() {

    const { list = [] } = this.props.users;

    const columns = [{
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: 50,
      render: (text, record) => (
        <div>{text}</div>
      ),
    }, {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
      width: 120,
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
      width: 150,
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
        <Table columns={columns} dataSource={list} pagination={this.pagination} rowKey='id' />
      </div>
    );
  }
}
