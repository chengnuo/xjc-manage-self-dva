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
// import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class Create extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'plans/fetchPostPlans',
          payload: values,
          callback: ()=>{
            this.props.dispatch(routerRedux.push(`/plans/list`));
          },
        });
      }
    });
  };
  render() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

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
        title="工具新增"
        content="工具"
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="名称">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入名称',
                  },
                ],
              })(<Input placeholder="请输入名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="logo">
              <span>图片logo-avatar</span>
            </FormItem>
            <FormItem {...formItemLayout} label="描述">
              {getFieldDecorator('description', {
                rules: [
                  {
                    required: true,
                    message: '请输入描述',
                  },
                ],
              })(<TextArea rows={4} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="官网">
              {getFieldDecorator('url', {
                rules: [
                  {
                    required: true,
                    message: '请输入官网',
                  },
                ],
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
