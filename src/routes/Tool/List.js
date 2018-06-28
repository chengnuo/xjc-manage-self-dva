import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Collapse, Divider, List } from 'antd';

const Panel = Collapse.Panel;

// 前端fehelper助手
const fehelperData = [
  {
    title: 'FeHelper--弹出菜单',
    description: '插件入口，点击ICON，插件相关的所有功能都会在这里列出来，在popup中选择所需使用的功能即可使用',
  },
  {
    title: 'JSON接口自动格式化查看',
    description: '当你访问的接口（打开的页面）返回的是一个JSON格式的数据，FeHelper会自动将内容进行格式化处理，便于您的查看',
  },
  {
    title: 'JSON查看器',
    description: '把你的JSON代码粘贴到JSON查看器的输入框中，点击“格式化”，在下方便会以非常友好的方式列出JSON数据，便于查看',
  },
  {
    title: '代码美化',
    description: '包括Javascript代码美化、CSS代码美化、HTML代码美化；其实所有C系的代码，都可以通过Javascript代码美化工具进行格式化查看',
  },
  {
    title: '代码压缩',
    description: '包括Web前端Javascript代码压缩、CSS代码压缩、HTML代码压缩',
  },
  {
    title: '字符串编解码',
    description: '包括Unicode编码和解码、UTF-8字符串编码和解码、Base64字符串编解码、字符串MD5编码，前端非常实用的工具',
  },
  {
    title: '图片Base64编码',
    description: '对图片文件进行base64编码，直接拷贝datauri格式的数据',
  },
  {
    title: '二维码生成器',
    description: '能对网址、普通文本内容、电话号码、通讯录、短信等编码并生成二维码，很实用的二维码生成工具',
  },
  {
    title: '二维码解码',
    description: '针对网页上的二维码，点击右键，选择【二维码解码】，可在当前页面直接看到解码结果！',
  },
  {
    title: '全网页截图',
    description: '针对整个网页进行滚动截屏，在新窗口可预览后再手动保存',
  },
  {
    title: '时间（戳）转换工具',
    description: '支持任意时间到对应时间戳的转换；支持任意时间戳到对应日期的转换',
  },
  {
    title: '正则表达式工具',
    description: '提供一个正则表达式的及时测试工具，并能将匹配结果进行高亮显示、高亮定位等；同时还罗列了一些常用的正则表达式供开发者使用',
  },
  {
    title: '页面取色工具',
    description: '提供一个网页取色的工具，任意页面均可使用，方便大家在开发过程中能精准获取某元素的颜色值，再也不用截图后再通过Photoshop取色了',
  },
  {
    title: '编码规范检测',
    description: '对当前网页进行Javascript、CSS、HTML编码规范的检测，包括文件是否压缩、标签是否正确闭合、cookie管理等等',
  },
  {
    title: '页面性能检测',
    description: '对当前页面的性能进行检测，如HTTP响应时间、页面渲染时间、是否启用gzip压缩等等',
  },
  {
    title: 'FeHelper配置页',
    description: '在这里，你可以随意定制属于你自己的FeHelper常用功能！',
  },
];



@connect(state => ({
  isloading: state.error.isloading,
}))
export default class ToolList extends PureComponent {
  state = {
    isloading: false,
  };
  render() {
    return (
      <PageHeaderLayout
        title="工具模块"
        content="收藏一些常用工具，但是没有入库"
      >
        <Collapse accordion>
          <Panel header="谷歌访问助手" key="1">
            <div>
              <div>
                域名：
                <a href="http://www.ggfwzs.com/" target="_blank">
                  http://www.ggfwzs.com/
                </a>
              </div>
              <div>
                说明：
                仅为香港地区用户提供谷歌chrome商店，gmail邮箱提供加速服务，解决偶尔打不开的问题
                仅为学生，外贸人群，chrome扩展商店用户等需要的用户，提供加速服务。
                不可避免有可能短暂的无法使用，还请理解，我们会及时维护，保证95%的可用率
              </div>
            </div>
          </Panel>
          <Panel header="FeHelper，Chrome浏览器插件，包含一些前端实用的工具，欢迎安装使用！" key="2">
            <div>
              <div>
                域名：
                <a href="https://www.baidufe.com/fehelper/feedback.html" target="_blank">
                  https://www.baidufe.com/fehelper/feedback.html
                </a>
              </div>
              <div>

                功能简介>>


                <List
                  itemLayout="horizontal"
                  dataSource={fehelperData}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={<a href="https://ant.design">{item.title}</a>}
                        description={
                          <div>{item.description}</div>
                        }
                      />
                    </List.Item>
                  )}
                />

              </div>
            </div>
          </Panel>
          <Panel header="This is panel header 3" key="3">
            <p>3</p>
          </Panel>
        </Collapse>
      </PageHeaderLayout>
    );
  }
}
