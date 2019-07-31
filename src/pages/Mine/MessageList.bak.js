import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import { connect } from 'dva';
import {
  List,
  Card,
  Row,
  Col,
  Radio,
  Input,
  Progress,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
  Modal,
  Form,
  DatePicker,
  Select,
  Upload,
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Result from '@/components/Result';

import styles from './MessageList.less';

const FormItem = Form.Item;
const { Search, TextArea } = Input;
// 消息类
import { apiLocation } from '@/utils/utils';

@connect(({ mineMessage, loading }) => ({
  mineMessage,
  loading: loading.models.list,
}))
@Form.create()
class BasicList extends PureComponent {
  state = {
    visible: false,
    done: false,
    imageUrl: '',
  };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  componentDidMount() {
    this.fetchGetMessages(); // 请求
  }

  fetchGetMessages = (payload)=> {
    this.props.dispatch({
      type: 'mineMessage/fetchGetMessages',
      payload: Object.assign({},{
        pageCurrent: 1,
        pageSize: 10,
        title: '',
      },payload),
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
      current: undefined,
      imageUrl: ``
    });
  };

  showEditModal = item => {
    this.setState({
      visible: true,
      current: item,
      imageUrl: `${apiLocation.origin}/public/images/${item.avatar}`
    });
  };

  handleDone = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false,
    });
  };

  handleCancel = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      visible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const id = current ? current.id : '';

    setTimeout(() => this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        done: true,
      });


      const submitData = Object.assign({}, fieldsValue,{

      })

      if(id){
        dispatch({
          type: 'mineMessage/fetchPutMessages',
          payload: { id, ...submitData },
          callback: ()=>{
            this.fetchGetMessages(); // 请求
          },
        });

      }else{
        dispatch({
          type: 'mineMessage/fetchPostMessages',
          payload: { ...submitData },
          callback: ()=>{
            this.fetchGetMessages(); // 请求
          },
        });
      }


    });
  };

  deleteItem = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'mineMessage/fetchDeleteMessages',
      payload: { id },
      callback: ()=>{
        this.fetchGetMessages(); // 请求
      }
    });

  };

  handleDelete = (currentItem) => {
    Modal.confirm({
      title: '删除消息',
      content: '确定删除该消息吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => this.deleteItem(currentItem.id),
    });
  }

  get pagination() {

    const { mineMessage, loading } = this.props;
    const { list = [], pageCurrent, pageSize, total } = mineMessage;

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


  // pageSize 变化的回调
  handleShowSizeChange = (pageCurrent, pageSize)=> {
    this.fetchGetMessages({
      pageCurrent,
      pageSize,
    });
  }

  // 点击当前页面
  handleChange =(pageCurrent)=> {
    this.fetchGetMessages({
      pageCurrent,
    });
  }

  getBase64 = (img, callback)=> {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }


  handleUploadChange = (info) => {
    console.log('info.file=>', info.file)
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }

  render() {
    const { mineMessage, loading } = this.props;
    const { list = [] } = mineMessage;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { visible, done, current = {}, imageUrl } = this.state;

    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={(value) => {
          this.fetchGetMessages({
            title: value
          })
        }} />
      </div>
    );



    const ListContent = ({ data: { owner, createdAt, percent, status } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>Owner</span>
          <p>{owner}</p>
        </div>
      </div>
    );


    const uploadButton = (
      <div>
        <Icon type={ this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );


    const getModalContent = () => {
      if (done) {
        return (
          <Result
            type="success"
            title="操作成功"
            description="一系列的信息描述，很短同样也可以带标点。"
            actions={
              <Button type="primary" onClick={this.handleDone}>
                知道了
              </Button>
            }
            className={styles.formResult}
          />
        );
      }
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="消息名称" {...this.formLayout}>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入消息名称' }],
              initialValue: current.title,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="描述" {...this.formLayout}>
            {getFieldDecorator('description', {
              rules: [
                {
                  required: true,
                  message: '请输入描述',
                },
              ],
              initialValue: current.description,
            })(<TextArea rows={4} />)}
          </FormItem>
        </Form>
      );
    };
    return (
      <PageHeaderWrapper>
        <div className={styles.standardList}>

          <Card
            className={styles.listCard}
            bordered={false}
            title="消息列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Button
              type="dashed"
              style={{ width: '100%', marginBottom: 8 }}
              icon="plus"
              onClick={this.showModal}
              ref={component => {
                /* eslint-disable */
                this.addBtn = findDOMNode(component);
                /* eslint-enable */
              }}
            >
              添加
            </Button>
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={this.pagination}
              dataSource={list}
              renderItem={item => (
                <List.Item
                  actions={[
                    <a
                      onClick={e => {
                        e.preventDefault();
                        this.showEditModal(item);
                      }}
                    >
                      编辑
                    </a>,
                    <a
                      onClick={e => {
                        e.preventDefault();
                        this.handleDelete(item);
                      }}
                    >
                      删除
                    </a>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={`${apiLocation.origin}/public/images/${item.avatar}`} shape="square" size="large" />}
                    title={<a href={item.url}>{item.title}</a>}
                    description={item.description}
                  />
                  {/*<ListContent data={item} />*/}
                </List.Item>
              )}
            />
          </Card>
        </div>
        <Modal
          title={done ? null : `消息${current ? '编辑' : '添加'}`}
          className={styles.standardListForm}
          width={640}
          bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
          destroyOnClose
          visible={visible}
          {...modalFooter}
        >
          {getModalContent()}
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default BasicList;
