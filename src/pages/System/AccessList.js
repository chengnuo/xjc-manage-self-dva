import React, { Component } from 'react';
import { connect } from 'dva';
import { Tree } from 'antd';

const { TreeNode } = Tree;

@connect(({ system, loading }) => ({
  system,
  loading: loading.models.authMenuList,
}))
class AccessList extends Component {
  state = {
    expandedKeys: [],
    autoExpandParent: true,
    checkedKeys: [],
    selectedKeys: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/fetchAuthMenuList',
      // payload: {
      //   count: 8,
      // },
    });
  }

  onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  };

  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  };

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

  render() {
    const { authMenuList = [] } = this.props.system;

    console.log('authMenuList', authMenuList);

    return (
      <div>
        {/* 树节点 */}
        <div>
          <Tree
            checkable
            onExpand={this.onExpand}
            expandedKeys={this.state.expandedKeys}
            autoExpandParent={this.state.autoExpandParent}
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
            onSelect={this.onSelect}
            selectedKeys={this.state.selectedKeys}
          >
            {this.renderTreeNodes(authMenuList)}
          </Tree>
        </div>
      </div>
    );
  }
}

export default AccessList;
