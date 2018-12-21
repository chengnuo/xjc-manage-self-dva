import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Button } from 'antd';

import { pagination } from '@/utils/utils';





@connect(({ systemUser, loading }) => ({
  systemUser,
  loading: loading.models.authMenuList,
}))
class UserList extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };

  tableColumns = [
    {
      title: '用户id',
      dataIndex: 'id',
    },
    {
      title: '用户名称',
      dataIndex: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '创建时间',
      dataIndex: 'created_time',
    },
    {
      title: '更新时间',
      dataIndex: 'updated_time',
    },
  ];

  componentDidMount(){
    this.apiFetchAuthUserList();
  };

  // 列表
  apiFetchAuthUserList = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemUser/fetchAuthUserList',
      payload: Object.assign({},{
        pageCurrent: 1,
        pageSize: 10,
      }, payload),
    });
  };

  // 多选
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  // pageSize 变化的回调
  handleShowSizeChange = (pageCurrent, pageSize)=> {
    console.log('pageCurrent, pageSize', pageCurrent, pageSize)
    this.apiFetchAuthUserList({
      pageCurrent,
      pageSize,
    });
  }

  // 点击当前页面
  handleChangePageCurrent = (pageCurrent) =>{
    console.log('pageCurrent', pageCurrent);
    this.apiFetchAuthUserList({
      pageCurrent,
    });
  }


  render() {
    const { loading, selectedRowKeys } = this.state;
    const { dataSource } = this.props.systemUser;

    // 多选
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <div>
        <div>
          <Button
            type="primary"
            size={'small'}
            onClick={()=>{
              this.apiFetchAuthUserList();
            }}
          >
            查询
          </Button>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={this.tableColumns}
          dataSource={dataSource}
          pagination={pagination(this, this.props.systemUser)}
          rowKey={'id'}
        />
      </div>
    );
  }
}

export default UserList;
