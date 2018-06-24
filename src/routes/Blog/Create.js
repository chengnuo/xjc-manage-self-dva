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

const ReactMarkdown = require('react-markdown');
import CodeBlock from './code-block';
import MarkdownControls from './markdown-controls';
import {Controlled as CodeMirror} from 'react-codemirror2';




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
      value: '\n' +
      '# Live demo\n' +
      '\n' +
      'Changes are automatically rendered as you type.\n' +
      '\n' +
      '* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)\n' +
      '* Renders actual, "native" React DOM elements\n' +
      '* Allows you to escape or skip HTML (try toggling the checkboxes above)\n' +
      '* If you escape or skip the HTML, no `dangerouslySetInnerHTML` is used! Yay!\n' +
      '\n' +
      '## HTML block below\n' +
      '\n' +
      '<blockquote>\n' +
      '  This blockquote will change based on the HTML settings above.\n' +
      '</blockquote>\n' +
      '<p>你说啊</p>\n' +
      '<del>删除线吧</del>\n' +
      '\n' +
      '## How about some code?\n' +
      '```js\n' +
      'var React = require(\'react\');\n' +
      'var Markdown = require(\'react-markdown\');\n' +
      '\n' +
      'React.render(\n' +
      '  <Markdown source="# Your markdown here" />,\n' +
      '  document.getElementById(\'content\')\n' +
      ');\n' +
      '```\n' +
      '\n' +
      'Pretty neat, eh?\n' +
      '\n' +
      '## Tables?\n' +
      '\n' +
      '| Feature | Support |\n' +
      '| ------ | ----------- |\n' +
      '| tables | ✔ |\n' +
      '| alignment | ✔ |\n' +
      '| wewt | ✔ |\n' +
      '\n' +
      '## More info?\n' +
      '\n' +
      'Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)\n' +
      '\n' +
      '---------------\n' +
      '\n' +
      'A component by [VaffelNinja](http://vaffel.ninja) / Espen Hovlandsdal\n',
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
    const input = getFieldValue('content') || '';

    console.log('CodeBlock', CodeBlock)

    return (
      <PageHeaderLayout
        title="基础表单"
        content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="标题">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入标题',
                  },
                ],
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
              })(<TextArea rows={4} />)}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
            </FormItem>
          </Form>
          <div className="result-pane">

            <MarkdownControls onChange={this.handleControlsChange} mode={this.state.htmlMode} />

            <CodeMirror
              value={this.state.value}
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
            <ReactMarkdown
              className="result"
              source={this.state.value}
              renderers={{code: CodeBlock}}
              skipHtml={this.state.htmlMode === 'skip'}
              escapeHtml={this.state.htmlMode === 'escape'}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
