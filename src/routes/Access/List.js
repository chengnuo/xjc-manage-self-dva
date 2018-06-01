import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Table, Icon, Divider } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import form from "../../models/form";


@connect(({ access, loading }) => ({
  access,
}))
export default class List extends PureComponent {
  componentDidMount() {
    console.log('this',this)
    this.fetchGetAccess({
      pageCurrent: 1,
      pageSize: 10,
    });
  }
  get pagination() {

    const { pageCurrent, pageSize, total = 0 } = this.props.access;

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
  fetchGetAccess(payload) {
    this.props.dispatch({
      type: 'access/fetchGetAccess',
      payload: Object.assign({},{
        pageCurrent: 1,
        pageSize: 10,
      },payload),
    });
  }
  // pageSize 变化的回调
  handleShowSizeChange(pageCurrent, pageSize) {
    this.fetchGetAccess({
      pageCurrent,
      pageSize,
    });
  }
  // 点击当前页面
  handleChange(pageCurrent) {
    this.fetchGetAccess({
      pageCurrent,
    });
  }
  // 新增
  goCreate =()=>{
    const { dispatch } = this.props;
    dispatch(routerRedux.push(`/access/create`));
  }
  // 编辑
  goEditor =(record)=>{
    const { dispatch } = this.props;
    dispatch(routerRedux.push(`/access/editor/${record.id}`));
  }
  // 删除
  handleDelete = (record) =>{
    this.props.dispatch({
      type: 'access/fetchDeleteAccess',
      payload: {
        id: record.id,
      },
      callback: ()=>{
        this.fetchGetAccess();
      },
    });
  }

  render() {

    const { list = [], pageCurrent, pageSize } = this.props.access;

    console.log('list', list)

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
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: 60,
      render: (text, record) => (
        <div>{text}</div>
      ),
    }, {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
      width: 120,
      render: (text, record) => (
        <div>{text}</div>
      ),
    }, {
      title: 'urls',
      dataIndex: 'urls',
      key: 'urls',
      width: 120,
      render: (text, record) => (
        <div>{text}</div>
      ),
    },{
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (text, record) => (
        <div>{text === 1 ? '开启' : '关闭'}</div>
      ),
    },{
      title: '更新时间',
      dataIndex: 'updated_time',
      key: 'updated_time',
      render: (text, record) => (
        <div>{moment(text).format('YYYY-MM-DD hh:mm:ss')}</div>
      ),
    },{
      title: '创建时间',
      dataIndex: 'created_time',
      key: 'created_time',
      render: (text, record) => (
        <div>{moment(text).format('YYYY-MM-DD hh:mm:ss')}</div>
      ),
    }, {
      title: '操作',
      key: 'action',
      width: 150,
      render: (text, record) => {

        return (
          <div>
            <a href="javascript:;" onClick={this.goCreate}>新增</a>
            <Divider type="vertical" />
            <a href="javascript:;" onClick={this.goEditor.bind(this, record)}>编辑</a>
            <Divider type="vertical" />
            <a href="javascript:;" onClick={this.handleDelete.bind(this, record)}>删除</a>
          </div>
        )
      },
    }];

    const PageHeaderLayoutContent = (
      <div>说明`http://www.54php.cn/default/42.html`【RBAC】打造Web权限控制系统</div>
    )

    return (
      <PageHeaderLayout
        title="权限列表"
        content={PageHeaderLayoutContent}
      >
        {/* 权限列表 */}
        <Table columns={columns} dataSource={list} pagination={this.pagination} rowKey='id' />
      </PageHeaderLayout>
    );
  }
}
