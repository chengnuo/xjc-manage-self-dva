import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Table, Icon, Divider } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import form from "../../models/form";


@connect(({ blogs, loading }) => ({
  blogs,
}))
export default class List extends PureComponent {
  componentDidMount() {
    console.log('this',this)
    this.fetchGetBlogs({
      pageCurrent: 1,
      pageSize: 10,
    });
  }
  get pagination() {

    const { pageCurrent, pageSize, total = 0 } = this.props.blogs;

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
  fetchGetBlogs(payload) {
    this.props.dispatch({
      type: 'blogs/fetchGetBlogs',
      payload: Object.assign({},{
        pageCurrent: 1,
        pageSize: 10,
      },payload),
    });
  }
  // pageSize 变化的回调
  handleShowSizeChange(pageCurrent, pageSize) {
    this.fetchGetBlogs({
      pageCurrent,
      pageSize,
    });
  }
  // 点击当前页面
  handleChange(pageCurrent) {
    this.fetchGetBlogs({
      pageCurrent,
    });
  }
  // 新增
  goCreate =()=>{
    const { dispatch } = this.props;
    dispatch(routerRedux.push(`/blogs/create`));
  }
  // 编辑
  goEditor =(record)=>{
    const { dispatch } = this.props;
    dispatch(routerRedux.push(`/blogs/editor/${record.id}`));
  }
  // 设置博客
  goSetRoles =(record)=>{
    const { dispatch } = this.props;
    dispatch(routerRedux.push(`/blogs/setRoles/${record.id}`));
  }
  // 删除
  handleDelete = (record) =>{
    this.props.dispatch({
      type: 'blogs/fetchDeleteBlogs',
      payload: {
        id: record.id,
      },
      callback: ()=>{
        this.fetchGetBlogs();
      },
    });
  }

  render() {
    const { list = [], pageCurrent, pageSize } = this.props.blogs;

    const columns = [{
      title: '序号',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
      width: 60,
      render: (text, record, index) => (
        <div>
          {index+1 + (pageCurrent-1) * pageSize}
        </div>
      ),
    },{
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: 120,
      render: (text, record) => (
        <div>{text}</div>
      ),
    }, {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      width: 320,
      render: (text, record) => (
        <div>{text}</div>
      ),
    }, {
      title: '操作',
      key: 'action',
      width: 300,
      render: (text, record) => {

        return (
          <div>
            <a href="javascript:;" onClick={this.goCreate}>新增</a>
            <Divider type="vertical" />
            <a href="javascript:;" onClick={this.goEditor.bind(this, record)}>编辑</a>
          </div>
        )
      },
    }];

    const PageHeaderLayoutContent = (
      <div>说明：记录自己的博客内容</div>
    )

    return (
      <PageHeaderLayout
        title="博客列表"
        content={PageHeaderLayoutContent}
      >
        {/* 博客列表 */}
        <Table columns={columns} dataSource={list} pagination={this.pagination} rowKey='id' />
      </PageHeaderLayout>
    );
  }
}
