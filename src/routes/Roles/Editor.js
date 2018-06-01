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
  Switch,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ roles,loading }) => ({
  roles,
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class Editor extends PureComponent {
  componentDidMount() {
    console.log('this',this)
    this.fetchGetRoles({
      pageCurrent: 1,
      pageSize: 10,
      id: 1,
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'roles/fetchPutRoles',
          payload: values,
          callback: ()=>{
            this.props.dispatch(routerRedux.push(`/roles/list`));
          },
        });
      }
    });
  };
  fetchGetRoles(payload) {
    this.props.dispatch({
      type: 'roles/fetchGetRoles',
      payload: Object.assign({},{
        pageCurrent: 1,
        pageSize: 10,
      },payload),
    });
  }
  render() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { list = [] } = this.props.roles;


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
        content="表单页用于向角色收集或验证信息，基础表单常见于数据项较少的表单场景。"
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
              })(<Input placeholder="请输入角色id" disabled />)}
            </FormItem>
            <FormItem {...formItemLayout} label="角色名">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入角色名',
                  },
                ],
                initialValue: list.length > 0 && list[0].name,
              })(<Input placeholder="请输入角色名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="角色状态">
              {getFieldDecorator('status', {
                valuePropName: 'checked',
                rules: [
                  {
                    required: true,
                    message: '请输入角色名',
                  },
                ],
                initialValue: list.length > 0 && list[0].status,
              })(
                <Switch />
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>保存</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
