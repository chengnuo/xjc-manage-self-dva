import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Button, Form, Input, Icon, Divider, Modal, Tag, notification, Tree } from 'antd';

import { pagination } from '@/utils/utils';


const FormItem = Form.Item;
const { TreeNode } = Tree;




@connect(({ systemRole, systemAccess, loading }) => ({
  systemRole,
  systemAccess,
  loading: loading.models.authMenuList,
}))
@Form.create()
class RoleList extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false, // loading
    visibleEditor: false, // 编辑
    visibleDelete: false, // 删除
    visibleSetAccess: false, // 角色设置权限
    dataSourceItem: {}, // 选择tableItem
    editorType: 'create', // 新增或者编辑
    checkedKeys: [], // 树组件值
    selectedKeys: [],
  };

  tableColumns = [
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <span>
          <a href="javascript:;"
             onClick={()=>{
               this.handleSetAccess(record, 'editor')
             }}
          >
            角色权限
          </a>
          <Divider type="vertical" />
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
      title: '角色id',
      dataIndex: 'id',
    },
    {
      title: '角色名',
      dataIndex: 'name',
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
    this.apiFetchAuthRoleList({
      pageCurrent: 1,
      pageSize: 10,
    });
  };

  valuesData = (values) =>{
    console.log('values', values)
    let valuesRoles = values.checked || [];
    let fetchData = valuesRoles.map((item)=>{
      return {
        role_id: parseInt(this.state.dataSourceItem.id ,10),
        access_id: item,
      }
    });
    return fetchData;
  }


  tempalteOptionsDefaul = () =>{
    const  { userAccessList = [] } = this.props.systemRole;

    let result = userAccessList.map((item)=>{
      return String(item.access_id);
    })

    console.log('result-', result);

    return result;
  }

  // 角色权限-设置回选
  apiFetchAuthRoleSetAccessList = (item, callback) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemRole/fetchAuthRoleSetAccessList',
      payload: {
        ...item,
      },
      callback: ()=>{
        callback && callback();
      }
    });
  };

  // 角色权限-设置
  apiFetchAuthRoleSetAccess = (payload) => {
    console.log('payload', payload)
    const { dispatch } = this.props;
    dispatch({
      type: 'systemRole/fetchAuthRoleSetAccess',
      payload,
    });
  };

  // 权限菜单列表
  apiFetchAuthMenuList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemAccess/fetchAuthMenuList',
    });
  };

  // 列表
  apiFetchAuthRoleList = (payload) => {
    const { dispatch } = this.props;
    const { pageCurrent, pageSize, total = 0 } = this.props.systemRole;
    dispatch({
      type: 'systemRole/fetchAuthRoleList',
      payload: Object.assign({},{
        pageCurrent: pageCurrent,
        pageSize: pageSize,
      }, payload),
    });
  };

  // 删除
  apiFetchAuthRoleDelete = item => {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemRole/fetchAuthRoleDelete',
      payload: {
        ...item,
      },
      callback: response => {
        if (response.status === 200) {
          this.apiFetchAuthRoleList();
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
  apiFetchAuthRoleCreate = item => {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemRole/fetchAuthRoleCreate',
      payload: {
        ...item,
      },
      callback: response => {
        if (response.status === 200) {
          this.apiFetchAuthRoleList();
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
  apiFetchAuthRoleUpdate = item => {

    console.log('item', item)

    const { dispatch } = this.props;
    dispatch({
      type: 'systemRole/fetchAuthRoleUpdate',
      payload: {
        ...item,
      },
      callback: response => {
        if (response.status === 200) {
          this.apiFetchAuthRoleList();
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
    this.apiFetchAuthRoleList({
      pageCurrent,
      pageSize,
    });
  }

  // 点击当前页面
  handleChangePageCurrent = (pageCurrent) =>{
    console.log('pageCurrent', pageCurrent);
    this.apiFetchAuthRoleList({
      pageCurrent,
    });
  }

  // 查询
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(['searchRolename'],(err, values) => {
      if (!err) {
        this.apiFetchAuthRoleList({
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
    this.props.form.validateFields(['name'],(err, values) => {
      if (!err) {
        if (this.state.editorType === 'create') {
          // 添加的时候
          this.apiFetchAuthRoleCreate({
            name: values.name,
          });
        } else if (this.state.editorType === 'editor') {
          this.apiFetchAuthRoleUpdate({
            name: values.name,
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
    this.apiFetchAuthRoleDelete({
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

  // 点击角色设置权限的时候 ================角色设置权限====================
  handleSetAccess = item => {
    this.apiFetchAuthMenuList();
    this.apiFetchAuthRoleSetAccessList({
      role_id: item.id,
    }, ()=>{
      this.setState({
        visibleSetAccess: true,
        dataSourceItem: item,
        checkedKeys: this.tempalteOptionsDefaul(),
      });
    });

  };

  // 角色设置权限-确定
  handleOkSetAccess = e => {

    let fetchData = this.valuesData(this.state.checkedKeys);

    this.apiFetchAuthRoleSetAccess(fetchData)
    this.setState({
      visibleSetAccess: false,
    });
  };

  // 角色设置权限-取消
  handleCancelSetAccess = e => {
    console.log(e);
    this.setState({
      visibleSetAccess: false,
    });
  };

  // 树
  renderTreeNodes = data =>
    data.map(item => {
      // console.log('item.children', item.children)
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.id}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      // console.log('TreeNodeitem', item)
      return <TreeNode title={item.name} key={item.id} />;
    });


  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  }

  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  }


  render() {
    const { loading, selectedRowKeys } = this.state;
    const { dataSource } = this.props.systemRole;
    const { getFieldDecorator } = this.props.form;
    const dataSourceSystemAccess = this.props.systemAccess.dataSource || []; // 权限菜单列表

    // 多选
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <div>
        <div style={{ padding: 16 }}>
          <Form layout="inline" onSubmit={this.handleSubmit} className="login-form">
            {/*<FormItem*/}
              {/*label="角色名"*/}
            {/*>*/}
              {/*{getFieldDecorator('searchRolename', {*/}
                {/*rules: [{ required: false, message: '请输入角色名' }],*/}
              {/*})(*/}
                {/*<Input placeholder="请输入角色名" />*/}
              {/*)}*/}
            {/*</FormItem>*/}
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
          pagination={pagination(this, this.props.systemRole)}
          rowKey={'id'}
          scroll={{ x: 1300 }}
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
                    rules: [{ required: true, message: '请输入角色id' }],
                    initialValue: this.state.dataSourceItem.id,
                  })(<Input disabled />)}
                </FormItem>
              ) : null}
              <FormItem label="角色名" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入角色名' }],
                  initialValue:
                    this.state.editorType === 'editor' ? this.state.dataSourceItem.name : '',
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
            {this.state.dataSourceItem.name}
          </Tag>
          ?
        </Modal>

        {/* 设置角色权限 selectedKeys={this.tempalteOptionsDefaul()} */}
        <Modal
          title="角色设置权限"
          visible={this.state.visibleSetAccess}
          onOk={this.handleOkSetAccess}
          onCancel={this.handleCancelSetAccess}
        >
          <div style={{ height: 300, overflowY: 'scroll', }}>
            <Tree
              checkable
              checkStrictly
              defaultExpandAll
              key={'id'}
              onSelect={this.onSelect}
              onCheck={this.onCheck}
              checkedKeys={this.state.checkedKeys}
              selectedKeys={this.state.selectedKeys}
            >
              {this.renderTreeNodes(dataSourceSystemAccess)}
            </Tree>
          </div>
        </Modal>
      </div>
    );
  }
}

export default RoleList;
