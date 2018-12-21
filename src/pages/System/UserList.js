import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Button, Form, Input, Icon } from 'antd';

import { pagination } from '@/utils/utils';


const FormItem = Form.Item;




@connect(({ systemUser, loading }) => ({
  systemUser,
  loading: loading.models.authMenuList,
}))
@Form.create()
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
      title: '用户名',
      dataIndex: 'username',
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
        username: '',
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

  // 查询
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.apiFetchAuthUserList({
          username: values.username,
        });
      }
    });
  }


  render() {
    const { loading, selectedRowKeys } = this.state;
    const { dataSource } = this.props.systemUser;
    const { getFieldDecorator } = this.props.form;

    // 多选
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <div>
        <div style={{ padding: 16 }}>
          <Form layout="inline" onSubmit={this.handleSubmit} className="login-form">
            <FormItem
              label="用户名"
            >
              {getFieldDecorator('username', {
                rules: [{ required: false, message: '请输入用户名' }],
              })(
                <Input placeholder="请输入用户名" />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
              >
                查询
              </Button>
            </FormItem>
          </Form>
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
