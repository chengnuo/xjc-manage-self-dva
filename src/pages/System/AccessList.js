import React, { Component } from 'react';
import { connect } from 'dva';
import { Tree, Modal, Button, Icon, Tag, notification, Form, Input, Select } from 'antd';
import styles from './AccessList.less';

const { TreeNode } = Tree;
const size = 'small';
const FormItem = Form.Item;
const Option = Select.Option;


@connect(({ system, loading }) => ({
  system,
  loading: loading.models.authMenuList,
}))
@Form.create()
class AccessList extends Component {
  state = {
    visibleTreeEditor: false,
    visibleTreeDelete: false,
    visibleTreeCreate: false,
    dataSourceItem: {},
    editorType: 'create', // 新增或者编辑

  };

  componentDidMount() {
    this.apiFetchAuthMenuList();
  }

  apiFetchAuthMenuList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/fetchAuthMenuList',
      // payload: {
      //   count: 8,
      // },
    });
  };

  // 删除
  apiFetchAuthMenuDelete = (item) =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'system/fetchAuthMenuDelete',
      payload: {
        ...item,
      },
      callback: (response)=>{
        if(response.status === 200){
          this.apiFetchAuthMenuList();
          notification.success({
            message: '系统提示',
            description: `${response.message}`,
          });
        }else{
          notification.error({
            message: '系统提示',
            description: `${response.message}`,
          });
        }

      },
    });
  }

  // 添加
  apiFetchAuthMenuCreate = (item) =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'system/fetchAuthMenuCreate',
      payload: {
        ...item,
      },
      callback: (response)=>{
        if(response.status === 200){
          this.apiFetchAuthMenuList();
          notification.success({
            message: '系统提示',
            description: `${response.message}`,
          });
        }else{
          notification.error({
            message: '系统提示',
            description: `${response.message}`,
          });
        }
      },
    });
  }

  // 编辑
  apiFetchAuthMenuUpdate = (item) =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'system/fetchAuthMenuUpdate',
      payload: {
        ...item,
      },
      callback: (response)=>{
        if(response.status === 200){
          this.apiFetchAuthMenuList();
          notification.success({
            message: '系统提示',
            description: `${response.message}`,
          });
        }else{
          notification.error({
            message: '系统提示',
            description: `${response.message}`,
          });
        }
      },
    });
  }

  onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  };

  onSelect = (selectedKeys, info) => {
    this.setState({
      visibleTreeEditor: true,
    });
    console.log('onSelect', selectedKeys, info);
    this.setState({ selectedKeys });
  };

  renderTreeNodes = data =>
    data.map(item => {
      // console.log('item.children', item.children)
      if (item.children) {
        return (
          <div className={styles.treeChildrens} title={item.title} key={item.id}>
            <Icon type="caret-down" />
            <span className={styles.treeChildrensTitle}>{item.title}</span>
            <span className={styles.treeChildrensTitle}>{item.name}</span>
            <span className={styles.treeChildrensRightBar}>
              <Button
                type="primary"
                className={styles.treeChildrensRightBarButton}
                onClick={()=>{
                  this.handleEditor(item, 'create')
                }}
                size={size}
              >
                添加
              </Button>
              <Button
                type="primary"
                className={styles.treeChildrensRightBarButton}
                size={size}
                onClick={()=>{
                  this.handleEditor(item, 'editor')
                }}
              >
                编辑
              </Button>
              <Button
                type="primary"
                className={styles.treeChildrensRightBarButton}
                size={size}
                onClick={()=>{
                  this.handleDelete(item)
                }}
              >
                删除
              </Button>
            </span>
            {this.renderTreeNodes(item.children)}
          </div>
        );
      }
      // console.log('TreeNodeitem', item)
      return (
        <div className={styles.treeChildren} title={item.title} key={item.id}>
          <span className={styles.treeChildrensTitle}>{item.title}</span>
          <span className={styles.treeChildrensTitle}>{item.name}</span>
          <span className={styles.treeChildrensRightBar}>
            <Button
              type="primary"
              className={styles.treeChildrensRightBarButton}
              size={size}
              onClick={()=>{
                this.handleEditor(item, 'create')
              }}
            >
              添加
            </Button>
            <Button
              type="primary"
              className={styles.treeChildrensRightBarButton}
              size={size}
              onClick={()=>{
                this.handleEditor(item, 'editor')
              }}
            >
              编辑
            </Button>
            <Button
              type="primary"
              className={styles.treeChildrensRightBarButton}
              size={size}
              onClick={()=>{
                this.handleDelete(item)
              }}
            >
              删除
            </Button>
          </span>
        </div>
      );
    });

  // 点击添加的时候 ================添加====================
  handleCreate = (item) => {
    this.setState({
      visibleTreeCreate: true,
      dataSourceItem: item,
    });
    console.log('点击添加的时候');
  };

  // 添加-确定
  handleOkTreeCreate = e => {
    e.preventDefault();
    const _this = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {

        console.log('err, values', err, values)
        this.apiFetchAuthMenuCreate({
          title: values.title,
          name: values.name,
          pid: this.state.dataSourceItem.id,
        });
        this.setState({
          visibleTreeCreate: false,
        });
      }
    });

  };

  // 添加-取消
  handleCancelTreeCreate = e => {
    console.log(e);
    this.setState({
      visibleTreeCreate: false,
    });
  };

  // 点击编辑的时候 ================编辑====================
  handleEditor = (item, editorType) => {
    this.setState({
      visibleTreeEditor: true,
      dataSourceItem: item,
      editorType: editorType,
    });
  };

  // 编辑-确定
  handleOkTreeEditor = e => {
    e.preventDefault();
    const _this = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(this.state.editorType === 'create'){ // 添加的时候
          this.apiFetchAuthMenuCreate({
            title: values.title,
            name: values.name,
            pid: this.state.dataSourceItem.id,
          });
        }else if(this.state.editorType === 'editor'){
          this.apiFetchAuthMenuUpdate({
            title: values.title,
            name: values.name,
            id: this.state.dataSourceItem.id,
          })
        }
        this.setState({
          visibleTreeEditor: false,
        });
        this.props.form.resetFields(); // 重置值
      }
    });
  };

  // 编辑-取消
  handleCancelTreeEditor = e => {
    console.log(e);
    this.setState({
      visibleTreeEditor: false,
    });
    this.props.form.resetFields(); // 重置值
  };

  // 点击删除的时候 ================删除====================
  handleDelete = (item) => {
    this.setState({
      visibleTreeDelete: true,
      dataSourceItem: item,
    });
  };

  // 删除-确定
  handleOkTreeDelete = e => {
    this.apiFetchAuthMenuDelete({
      id: this.state.dataSourceItem.id,
    });
    this.setState({
      visibleTreeDelete: false,
    });
  };

  // 删除-取消
  handleCancelTreeDelete = e => {
    console.log(e);
    this.setState({
      visibleTreeDelete: false,
    });
  };

  render() {
    const { dataSource = [] } = this.props.system;
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={styles.accessList}>
        {/* 树节点 */}
        <div>
          <div className={styles.treeChildren}>
            <span>顶级节点</span>
            <span className={styles.treeChildrensRightBar}>
              <Button
                type="primary"
                className={styles.treeChildrensRightBarButton}
                onClick={()=>{
                  this.handleCreate({id: 0})
                }}
                size={size}
              >
                添加
              </Button>
            </span>
          </div>
          <div>{this.renderTreeNodes(dataSource)}</div>
        </div>
        {/* 添加弹出层 */}
        {/*<Modal*/}
          {/*title="添加"*/}
          {/*visible={this.state.visibleTreeCreate}*/}
          {/*onOk={this.handleOkTreeCreate}*/}
          {/*onCancel={this.handleCancelTreeCreate}*/}
        {/*>*/}
          {/*<div>*/}
            {/*<Form onSubmit={this.handleOkTreeCreate}>*/}
              {/*<FormItem*/}
                {/*label="title"*/}
                {/*labelCol={{ span: 5 }}*/}
                {/*wrapperCol={{ span: 12 }}*/}
              {/*>*/}
                {/*{getFieldDecorator('title', {*/}
                  {/*rules: [{ required: true, message: '请输入菜单标题' }],*/}
                {/*})(*/}
                  {/*<Input />*/}
                {/*)}*/}
              {/*</FormItem>*/}
              {/*<FormItem*/}
                {/*label="name"*/}
                {/*labelCol={{ span: 5 }}*/}
                {/*wrapperCol={{ span: 12 }}*/}
              {/*>*/}
                {/*{getFieldDecorator('name', {*/}
                  {/*rules: [{ required: true, message: '请输入菜单名字英文' }],*/}
                {/*})(*/}
                  {/*<Input />*/}
                {/*)}*/}
              {/*</FormItem>*/}
            {/*</Form>*/}
          {/*</div>*/}
        {/*</Modal>*/}
        {/* 编辑弹出层 */}
        <Modal
          title="编辑"
          visible={this.state.visibleTreeEditor}
          onOk={this.handleOkTreeEditor}
          onCancel={this.handleCancelTreeEditor}
        >
          <div>
            <Form onSubmit={this.handleOkTreeEditor}>
              {
                this.state.editorType === 'editor'
                ?
                  <FormItem
                    label="id"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                  >
                    {getFieldDecorator('id', {
                      rules: [{ required: true, message: '请输入菜单id' }],
                      initialValue: this.state.dataSourceItem.id,
                    })(
                      <Input disabled />
                    )}
                  </FormItem>
                  :
                  null
              }
              <FormItem
                label="title"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
              >
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: '请输入菜单标题' }],
                  initialValue: this.state.editorType === 'editor' ? this.state.dataSourceItem.title : '',
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                label="name"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
              >
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入菜单名字英文' }],
                  initialValue: this.state.editorType === 'editor' ? this.state.dataSourceItem.name : '',
                })(
                  <Input />
                )}
              </FormItem>
            </Form>
          </div>
        </Modal>
        {/* 删除弹出层 */}
        <Modal
          title="系统提示"
          visible={this.state.visibleTreeDelete}
          onOk={this.handleOkTreeDelete}
          onCancel={this.handleCancelTreeDelete}
        >
          确定删除
          <Tag style={{ margin: "0 2px" }} color="#108ee9">{this.state.dataSourceItem.title}</Tag>
          ？
        </Modal>
      </div>
    );
  }
}

export default AccessList;
