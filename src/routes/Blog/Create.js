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
import FooterToolbar from 'components/FooterToolbar'; // 底下导航
import styles from './style.less';
const FormItem = Form.Item;

let testEditor = null;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class Create extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      content: '',
    }
  }
  componentDidMount(){
    testEditor = editormd("test-editormd", {
      width: "90%",
      height: 740,
      path : './../public/lib/',
      markdown: '', // 新增是空
      onload : function() {
        console.log('onload', this);
        //this.fullscreen();
        //this.unwatch();
        //this.watch().fullscreen();

        //this.setMarkdown("#PHP");
        //this.width("100%");
        //this.height(480);
        //this.resize("100%", 640);
      }
    });
  }
  componentWillUnmount(){
    this.setState({
      content: '',
    })
  }
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
            content: testEditor.getMarkdown(),
          });


          this.props.dispatch({
            type: 'blogs/fetchPostBlogs',
            payload: fetchData,
            callback: ()=>{
              this.props.dispatch(routerRedux.push(`/blogs/list`)); // 不刷新编辑的时候加载不了
              window.location.reload()
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
          <Form hideRequiredMark style={{ marginTop: 8 }} layout={'inline'}>
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
          </Form>

          {/* markdown */}
          <div id="test-editormd">
            {/*<textarea style={{display: 'none'}} value={this.state.content}></textarea>*/}
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
