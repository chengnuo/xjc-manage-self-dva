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
  Popover,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const ReactMarkdown = require('react-markdown');
import CodeBlock from './code-block';
import MarkdownControls from './markdown-controls';
import {Controlled as CodeMirror} from 'react-codemirror2';

import FooterToolbar from 'components/FooterToolbar'; // 底下导航




const hljs = window.hljs;


import styles from './style.less';


import '../../../node_modules/codemirror/lib/codemirror.css';
import '../../../node_modules/codemirror/theme/material.css';
import '../../../node_modules/codemirror/theme/xq-light.css';
import '../../../node_modules/codemirror/theme/monokai.css';


require('../../../node_modules/codemirror/mode/xml/xml');
require('../../../node_modules/codemirror/mode/javascript/javascript');
require('../../../node_modules/codemirror/mode/markdown/markdown'); // 需要加载 markdown


const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class Create extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      content: '',
      htmlMode: 'raw',
    }
  }
  handleControlsChange = (mode) =>{
    this.setState({htmlMode: mode})
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'blogs/fetchPostBlogs',
          payload: values,
          callback: ()=>{
            this.props.dispatch(routerRedux.push(`/blogs/list`));
          },
        });
      }
    });
  };
  render() {
    const { form, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFieldsAndScroll, getFieldsError, getFieldValue } = form;

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
    const input = getFieldValue('content') || '';


    const validate = () => {
      validateFieldsAndScroll((error, values) => {
        if (!error) {
          // submit the values
          // dispatch({
          //   type: 'form/submitAdvancedForm',
          //   payload: values,
          // });

          console.log('可以提交：')

          const fetchData = Object.assign({},{
            title: values.title,
            content: this.state.content,
          });


          this.props.dispatch({
            type: 'blogs/fetchPostBlogs',
            payload: fetchData,
            callback: ()=>{
              this.props.dispatch(routerRedux.push(`/blogs/list`));
            },
          });
        }
      });
    };
    const errors = getFieldsError();
    const getErrorInfo = () => {
      const errorCount = Object.keys(errors).filter(key => errors[key]).length;
      if (!errors || errorCount === 0) {
        return null;
      }
      const scrollToField = fieldKey => {
        const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
        if (labelNode) {
          labelNode.scrollIntoView(true);
        }
      };
      const errorList = Object.keys(errors).map(key => {
        if (!errors[key]) {
          return null;
        }
        return (
          <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
            <Icon type="cross-circle-o" className={styles.errorIcon} />
            <div className={styles.errorMessage}>{errors[key][0]}</div>
            {/*<div className={styles.errorField}>{fieldLabels[key]}</div>*/}
          </li>
        );
      });
      return (
        <span className={styles.errorIcon}>
          <Popover
            title="表单校验信息"
            content={errorList}
            overlayClassName={styles.errorPopover}
            trigger="click"
            getPopupContainer={trigger => trigger.parentNode}
          >
            <Icon type="exclamation-circle" />
          </Popover>
          {errorCount}
        </span>
      );
    };


    return (
      <PageHeaderLayout
        // title="基础表单"
        // content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
      >
        <Card bordered={false} className="blog">
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }} layout={'inline'}>
            <FormItem {...formItemLayout} label="标题">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入标题',
                  },
                ],
              })(<Input placeholder="请输入用户名" style={{'width': '250px'}} />)}
            </FormItem>
            {/*<FormItem {...formItemLayout} label="请输入文章内容">*/}
              {/*{getFieldDecorator('content', {*/}
                {/*rules: [*/}
                  {/*{*/}
                    {/*required: true,*/}
                    {/*message: '请输入文章内容',*/}
                  {/*},*/}
                {/*],*/}
              {/*})(<TextArea rows={4} />)}*/}
            {/*</FormItem>*/}
            {/*<FormItem {...submitFormLayout} style={{ marginTop: 32 }}>*/}
              {/*<Button type="primary" htmlType="submit" loading={submitting}>*/}
                {/*提交*/}
              {/*</Button>*/}
            {/*</FormItem>*/}
          </Form>
          <div className="demo">
            {/* 博客输入 */}
            <div className="editor-pane">
              <MarkdownControls onChange={this.handleControlsChange} mode={this.state.htmlMode} />
              <CodeMirror
                value={this.state.content}
                options={{
                  mode: 'markdown',
                  theme: 'monokai',
                  lineNumbers: true,
                }}
                onBeforeChange={(editor, data, value) => {
                  this.setState({value});
                }}
                onChange={(editor, data, value) => {
                }}
              />
            </div>
            {/* 博客展示 */}
            <div className="result-pane">
              <ReactMarkdown
                className="result"
                source={this.state.content}
                renderers={{code: CodeBlock}}
                skipHtml={this.state.htmlMode === 'skip'}
                escapeHtml={this.state.htmlMode === 'escape'}
              />
            </div>
          </div>
        </Card>
        <FooterToolbar style={{ width: this.state.width }}>
          {getErrorInfo()}
          <Button type="primary" onClick={validate} loading={submitting}>
            提交
          </Button>
        </FooterToolbar>
      </PageHeaderLayout>
    );
  }
}
