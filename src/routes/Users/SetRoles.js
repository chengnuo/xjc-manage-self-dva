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
  Checkbox,
} from 'antd';
const CheckboxGroup = Checkbox.Group;
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ users,loading }) => ({
  users,
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class SetRoles extends PureComponent {
  componentDidMount() {
    this.fetchSetRoles();
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'users/fetchPutUsers',
          payload: values,
          callback: ()=>{
            this.props.dispatch(routerRedux.push(`/users/list`));
          },
        });
      }
    });
  };
  // fetchGetUsers(payload) {
  //   this.props.dispatch({
  //     type: 'users/fetchGetUsers',
  //     payload: Object.assign({},{
  //       pageCurrent: 1,
  //       pageSize: 10,
  //     },payload),
  //   });
  // }
  fetchSetRoles(){
    this.props.dispatch({
      type: 'users/fetchSetRoles',
    });
  }
  onChange(checkedValues) {
    console.log('checked = ', checkedValues);
  }
  tempalteOptions(){
    const  { setRolesList = [] } = this.props.users;

    console.log('setRolesList',setRolesList)

    return setRolesList.map((item)=>{
      return {
        value: item.id,
        label: item.name,
      }
    })

  }
  render() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { list = [] } = this.props.users;


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

    // const options = [
    //   { label: 'Apple111', value: 'Apple' },
    //   { label: 'Pear', value: 'Pear' },
    //   { label: 'Orange', value: 'Orange' },
    // ];

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
                initialValue: this.props.match.params.id,
              })(<Input placeholder="请输入用户id" disabled />)}
            </FormItem>

            <CheckboxGroup options={this.tempalteOptions()} defaultValue={[]} onChange={this.onChange} />

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
