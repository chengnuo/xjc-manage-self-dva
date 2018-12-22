import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Button, Form, Input, Icon, Divider, Modal, Tag, notification } from 'antd';

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
    visibleEditor: false,
    visibleDelete: false,
    dataSourceItem: {},
    editorType: 'create', // 新增或者编辑
  };

  tableColumns = [
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <span>
          <a href="javascript:;"
             onClick={()=>{
               this.handleEditor(record, 'editor')
             }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a href="javascript:;"
             onClick={()=>{
               this.handleDelete(record)
             }}
          >删除</a>
        </span>
      ),
    },
    {
      title: '用户id',
      dataIndex: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '用户角色',
      dataIndex: 'todo',
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
    const { pageCurrent, pageSize, total = 0 } = this.props.systemUser;
    dispatch({
      type: 'systemUser/fetchAuthUserList',
      payload: Object.assign({},{
        pageCurrent: pageCurrent,
        pageSize: pageSize,
        username: '',
      }, payload),
    });
  };

  // 删除
  apiFetchAuthUserDelete = item => {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemUser/fetchAuthUserDelete',
      payload: {
        ...item,
      },
      callback: response => {
        if (response.status === 200) {
          this.apiFetchAuthUserList();
          notification.success({
            message: '系统提示',
            description: `${response.message}`,
          });
        } else {
          notification.error({
            message: '系统提示',
            description: `${response.message}`,
          });
        }
      },
    });
  };

  // 添加
  apiFetchAuthUserCreate = item => {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemUser/fetchAuthUserCreate',
      payload: {
        ...item,
      },
      callback: response => {
        if (response.status === 200) {
          this.apiFetchAuthUserList();
          notification.success({
            message: '系统提示',
            description: `${response.message}`,
          });
        } else {
          notification.error({
            message: '系统提示',
            description: `${response.message}`,
          });
        }
      },
    });
  };

  // 编辑
  apiFetchAuthUserUpdate = item => {

    console.log('item', item)

    const { dispatch } = this.props;
    dispatch({
      type: 'systemUser/fetchAuthUserUpdate',
      payload: {
        ...item,
      },
      callback: response => {
        if (response.status === 200) {
          this.apiFetchAuthUserList();
          notification.success({
            message: '系统提示',
            description: `${response.message}`,
          });
        } else {
          notification.error({
            message: '系统提示',
            description: `${response.message}`,
          });
        }
      },
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
    this.props.form.validateFields(['searchUsername'],(err, values) => {
      if (!err) {
        this.apiFetchAuthUserList({
          username: values.searchUsername || '',
          pageCurrent: 1,
          pageSize: 10,
        });
      }
    });
  }

  // 点击编辑的时候 ================编辑====================
  handleEditor = (item, editorType) => {
    this.setState({
      visibleEditor: true,
      dataSourceItem: item,
      editorType: editorType,
    });
  };

  // 编辑-确定
  handleOkEditor = e => {
    e.preventDefault();
    const _this = this;
    this.props.form.validateFields(['username', 'email', 'password'],(err, values) => {
      if (!err) {
        if (this.state.editorType === 'create') {
          // 添加的时候
          this.apiFetchAuthUserCreate({
            username: values.username,
            email: values.email,
            password: values.password,
          });
        } else if (this.state.editorType === 'editor') {
          this.apiFetchAuthUserUpdate({
            username: values.username,
            email: values.email,
            password: values.password,
            id: this.state.dataSourceItem.id,
          });
        }
        this.setState({
          visibleEditor: false,
        });
        this.props.form.resetFields(); // 重置值
      }
    });
  };

  // 编辑-取消
  handleCancelEditor = e => {
    console.log(e);
    this.setState({
      visibleEditor: false,
    });
    this.props.form.resetFields(); // 重置值
  };

  // 点击删除的时候 ================删除====================
  handleDelete = item => {
    this.setState({
      visibleDelete: true,
      dataSourceItem: item,
    });
  };

  // 删除-确定
  handleOkDelete = e => {
    this.apiFetchAuthUserDelete({
      id: this.state.dataSourceItem.id,
    });
    this.setState({
      visibleDelete: false,
    });
  };

  // 删除-取消
  handleCancelDelete = e => {
    console.log(e);
    this.setState({
      visibleDelete: false,
    });
  };


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
              {getFieldDecorator('searchUsername', {
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
            <FormItem>
              <Button
                onClick={()=>{
                  this.handleEditor({}, 'create')
                }}
              >
                新增
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

        {/* 编辑 */}
        <Modal
          title={this.state.editorType=='create' ? '新增' : '编辑'}
          visible={this.state.visibleEditor}
          onOk={this.handleOkEditor}
          onCancel={this.handleCancelEditor}
        >
          <div>
            <Form onSubmit={this.handleOkEditor}>
              {this.state.editorType === 'editor' ? (
                <FormItem label="id" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                  {getFieldDecorator('id', {
                    rules: [{ required: true, message: '请输入用户id' }],
                    initialValue: this.state.dataSourceItem.id,
                  })(<Input disabled />)}
                </FormItem>
              ) : null}
              <FormItem label="用户名" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入用户名' }],
                  initialValue:
                    this.state.editorType === 'editor' ? this.state.dataSourceItem.username : '',
                })(<Input />)}
              </FormItem>
              <FormItem label="密码" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                {getFieldDecorator('password', {
                  rules: [{ required: false, message: '请输入密码' }],
                })(<Input />)}
              </FormItem>
              <FormItem label="邮箱" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: '请输入邮箱' }],
                  initialValue:
                    this.state.editorType === 'editor' ? this.state.dataSourceItem.email : '',
                })(<Input />)}
              </FormItem>
            </Form>
          </div>
        </Modal>

        {/* 删除 */}
        <Modal
          title="系统提示"
          visible={this.state.visibleDelete}
          onOk={this.handleOkDelete}
          onCancel={this.handleCancelDelete}
        >
          确定删除
          <Tag style={{ margin: '0 2px' }} color="#108ee9">
            {this.state.dataSourceItem.name}/{this.state.dataSourceItem.username}
          </Tag>
          ?
        </Modal>
      </div>
    );
  }
}

export default UserList;
