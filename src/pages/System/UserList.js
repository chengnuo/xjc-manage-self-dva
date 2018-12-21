import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Button } from 'antd';

import { pagination } from '@/utils/utils';

const columns = [
  {
    title: '用户id',
    dataIndex: 'id',
  },
  {
    title: '用户名称',
    dataIndex: 'age',
  },
  {
    title: '邮箱',
    dataIndex: 'address',
  },
  {
    title: '创建时间',
    dataIndex: 'address2',
  },
  {
    title: '更新时间',
    dataIndex: 'address3',
  },
];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

@connect(({ systemUser, loading }) => ({
  systemUser,
  loading: loading.models.authMenuList,
}))
class UserList extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };

  // 多选
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  // pageSize 变化的回调
  handleShowSizeChange = (pageCurrent, pageSize)=> {
    console.log('pageCurrent, pageSize', pageCurrent, pageSize)
  }

  // 点击当前页面
  handleChangePageCurrent = (pageCurrent) =>{
    console.log('pageCurrent', pageCurrent);
  }

  render() {
    const { loading, selectedRowKeys } = this.state;

    // 多选
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={pagination(this, this.props.systemUser)}
          rowKey={'id'}
        />
      </div>
    );
  }
}

export default UserList;
