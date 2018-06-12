import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ blogs,loading }) => ({
  blogs,
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class Editor extends PureComponent {
  componentDidMount() {
    console.log('this',this)
    this.fetchGetBlogs({
      pageCurrent: 1,
      pageSize: 10,
      id: this.props.match.params.id,
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'blogs/fetchPutBlogs',
          payload: values,
          callback: ()=>{
            this.props.dispatch(routerRedux.push(`/blogs/list`));
          },
        });
      }
    });
  };
  fetchGetBlogs(payload) {
    this.props.dispatch({
      type: 'blogs/fetchGetBlogs',
      payload: Object.assign({},{
        pageCurrent: 1,
        pageSize: 10,
      },payload),
    });
  }
  render() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { list = [] } = this.props.blogs;


    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout
        title="基础表单"
        content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="id">
              {getFieldDecorator('id', {
                rules: [
                  {
                    required: true,
                    message: '请输入id',
                  },
                ],
                initialValue: list.length > 0 && list[0].id,
              })(<Input placeholder="请输入用户id" disabled />)}
            </FormItem>
            <FormItem {...formItemLayout} label="标题">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入标题',
                  },
                ],
                initialValue: list.length > 0 && list[0].title,
              })(<Input placeholder="请输入用户名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="请输入文章内容">
              {getFieldDecorator('content', {
                rules: [
                  {
                    required: true,
                    message: '请输入文章内容',
                  },
                ],
                initialValue: list.length > 0 && list[0].content,
              })(<TextArea rows={4} />)}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
