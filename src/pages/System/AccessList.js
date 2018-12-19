import React, { Component } from 'react';
import { connect } from 'dva';
import { Tree, Modal, Button } from 'antd';
import styles from './AccessList.less';

console.log('styles', styles)

const { TreeNode } = Tree;

@connect(({ system, loading }) => ({
  system,
  loading: loading.models.authMenuList,
}))
class AccessList extends Component {
  state = {
    checkedKeys: [],
    selectedKeys: [],
    visibleTreeEditor: false,
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = () =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'system/fetchAuthMenuList',
      // payload: {
      //   count: 8,
      // },
    });
  };

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
            <span className={styles.treeChildrensTitle}>{item.title}</span>
            <span className={styles.treeChildrensRightBar}>
              <Button type="primary" className={styles.treeChildrensRightBarButton} onClick={this.handleCreate}>添加</Button>
              <Button type="primary" className={styles.treeChildrensRightBarButton}>编辑</Button>
              <Button type="primary" className={styles.treeChildrensRightBarButton}>删除</Button>
            </span>
            {this.renderTreeNodes(item.children)}
          </div>
        );
      }
      // console.log('TreeNodeitem', item)
      return (
        <div className={styles.treeChildren} title={item.title} key={item.id} >
          <span className={styles.treeChildrensTitle}>{item.title}</span>
          <span className={styles.treeChildrensRightBar}>
            <Button type="primary" className={styles.treeChildrensRightBarButton}>添加</Button>
            <Button type="primary" className={styles.treeChildrensRightBarButton}>编辑</Button>
            <Button type="primary" className={styles.treeChildrensRightBarButton}>删除</Button>
          </span>
        </div>
      );
    });

  handleOkTree = (e) => {
    console.log(e);
    this.setState({
      visibleTreeEditor: false,
    });
  }

  handleCancelTree = (e) => {
    console.log(e);
    this.setState({
      visibleTreeEditor: false,
    });
  }

  // 点击添加的时候
  handleCreate = () => {
    this.setState({
      visibleTreeEditor: true,
    });
    console.log('点击添加的时候')
  }

  // 点击编辑的时候
  handleCreate = () => {
    this.setState({
      visibleTreeEditor: true,
    });
    console.log('点击编辑的时候')
  }

  // 点击删除的时候
  handleCreate = () => {
    this.setState({
      visibleTreeEditor: true,
    });
    console.log('点击删除的时候')
  }

  render() {
    const { authMenuListTree = [] } = this.props.system;

    return (
      <div className={styles.accessList}>
        {/* 树节点 */}
        <div>
          <div>
            {this.renderTreeNodes(authMenuListTree)}
          </div>
        </div>
        {/* 编辑弹出层 */}
        <Modal
          title="编辑"
          visible={this.state.visibleTreeEditor}
          onOk={this.handleOkTree}
          onCancel={this.handleCancelTree}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

export default AccessList;
