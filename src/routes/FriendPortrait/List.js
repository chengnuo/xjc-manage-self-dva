import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, Col, Row } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import xujunchao from './../../assets/images/xujunchao.jpeg'; // xujunchao

const { Meta } = Card;

@connect(({ friendPortrait, loading }) => ({
  friendPortrait,
}))
export default class FriendPortrait extends PureComponent {
  state = {
    isloading: false,
  };
  componentDidMount() {
    console.log('this-1',this)
    this.fetchGetFriendPortrait({
      pageCurrent: 1,
      pageSize: 10000, // 暂时显示全部，TODO:
    });
  }
  get pagination() {

    const { pageCurrent, pageSize, total = 0 } = this.props.friendPortrait;

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
  fetchGetFriendPortrait(payload) {
    this.props.dispatch({
      type: 'friendPortrait/fetchGetFriendPortrait',
      payload: Object.assign({},{
        pageCurrent: 1,
        pageSize: 10,
      },payload),
    });
  }
  // pageSize 变化的回调
  handleShowSizeChange(pageCurrent, pageSize) {
    this.fetchGetFriendPortrait({
      pageCurrent,
      pageSize,
    });
  }
  // 点击当前页面
  handleChange(pageCurrent) {
    this.fetchGetFriendPortrait({
      pageCurrent,
    });
  }
  // 跳转到新增
  handleCreate = () =>{
    this.props.dispatch(routerRedux.push(`/friendPortrait/create`));
  }
  render() {

    const { friendPortrait } = this.props;
    const { list = [] } = friendPortrait;


    return (
      <div>
        <PageHeaderLayout>
          <Row gutter={16}>
            {/*<Col span={6}>*/}
              {/*<Card*/}
                {/*hoverable*/}
                {/*style={{ width: 240 }}*/}
                {/*cover={<img alt="example" src={xujunchao} />}*/}
              {/*>*/}
                {/*<Meta*/}
                  {/*title="许俊超"*/}
                  {/*description="1号画像"*/}
                {/*/>*/}
              {/*</Card>*/}
            {/*</Col>*/}

            {
              list.map((item)=>{
                return (
                  <Col span={6} key={item.id}>
                    <Card
                      hoverable
                      style={{ width: 240 }}
                      cover={<img alt={item.name} src={`http://localhost:7001/public/images/${item.avatar}`} />}
                    >
                      <Meta
                        title={item.name}
                        description={item.description}
                      />
                    </Card>
                  </Col>
                )
              })
            }

          </Row>


        </PageHeaderLayout>
      </div>
    );
  }
}
