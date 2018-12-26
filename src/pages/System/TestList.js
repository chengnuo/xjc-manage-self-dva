import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';

@connect(({ menu, loading }) => ({
  menu,
  loading: loading.models.authMenuList,
}))
class TestList extends Component {
  // 获取菜单
  getMenuList = () => {
    this.apiFetchGetMenuList({
      id: 2,
    })
  }

  // 获取菜单-api
  apiFetchGetMenuList = (payload) => {

    console.log('payload', payload)

    const { dispatch } = this.props;
    dispatch({
      type: 'menu/fetchGetMenuList',
      payload,
    });
  }

  render() {
    return (
      <div>
        测试
        <Button
          type="primary"
          onClick={()=>{
                  this.getMenuList()
                }}
        >
          Primary
        </Button>
      </div>
    );
  }
}

export default TestList;
