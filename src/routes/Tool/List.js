import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Collapse, Divider, List, Card, Button, Icon } from 'antd';
import ggfwzsLogo from './../../assets/images/ggfwzsLogo.png'; // ggfwzsLogo
import fehelperLogo from './../../assets/images/fehelperLogo.png'; // fehelperLogo
import switchHostsLogo from './../../assets/images/switchHostsLogo.png'; // switchHostsLogo
import postmanLogo from './../../assets/images/postmanLogo.png'; // postmanLogo
import charlesLogo from './../../assets/images/charlesLogo.png'; // charlesLogo
import photoshopLogo from './../../assets/images/photoshopLogo.png'; // photoshopLogo
import xclientInfoLogo from './../../assets/images/xclientInfoLogo.png'; // xclientInfoLogo

import styles from './CardList.less';
import Ellipsis from 'components/Ellipsis';

const Panel = Collapse.Panel;


// 前端fehelper助手
const fehelperData = [
  {
    title: '网站',
    description: '',
    href: 'https://www.baidufe.com/fehelper/feedback.html',
    icon: fehelperLogo,
  },
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

const dataSource = [
  {
    "id": "fake-list-11",
    "title": "谷歌访问助手",
    "avatar": ggfwzsLogo,
    "description": "谷歌chrome浏览器商店，gmail邮箱提供加速服务，解决偶尔打不开的问题",
    "url": "https://www.baidufe.com/fehelper",
  },
  {
    "id": "fake-list-12",
    "title": "WEB前端助手(FeHelper)",
    "avatar": fehelperLogo,
    "description": "FeHelper，Chrome浏览器插件，包含一些前端实用的工具，欢迎安装使用！",
    "url": "https://www.baidufe.com/fehelper",
  },
  {
    "id": "fake-list-13",
    "title": "SwitchHosts",
    "avatar": switchHostsLogo,
    "description": "SwitchHosts! 是一个管理、切换多个 hosts 方案的工具。它是一个免费开源软件。",
    "url": "http://oldj.github.io/SwitchHosts/#cn",
  },
  {
    "id": "fake-list-14",
    "title": "postman",
    "avatar": postmanLogo,
    "description": "Postman Makes API Development Simple.Developers use Postman to build modern software for the API-first world.",
    "url": "https://www.getpostman.com/",
  },
  {
    "id": "fake-list-15",
    "title": "charlesproxy",
    "avatar": charlesLogo,
    "description": "Charles is an HTTP proxy / HTTP monitor / Reverse Proxy that enables a developer to view all of the HTTP and SSL / HTTPS traffic between their machine and the Internet. This includes requests, responses and the HTTP headers (which contain the cookies and caching information).",
    "url": "https://www.charlesproxy.com/",
  },
  {
    "id": "fake-list-16",
    "title": "photoshop",
    "avatar": photoshopLogo,
    "description": "Photoshop CC（Creative Cloud）。除去Photoshop CS6中所包含的功能，Photoshop CC新增相机防抖动功能、CameraRAW功能改进、图像提升采样、属性面板改进、Behance集成等功能，以及Creative Cloud，即云功能。",
    "url": "http://xclient.info/s/adobe-photoshop-cc.html?t=18bfae921446edd7f3e5f3589f62593d73674f6d",
  },
  {
    "id": "fake-list-17",
    "title": "xclientInfo",
    "avatar": xclientInfoLogo,
    "description": "http://xclient.info/ mac 专业破解软件 本站并不以盈利为目的，所有软件均来源于网络，旨在推广苹果电脑在国内的应用，并为大家带来更好的下载体验。",
    "url": "http://xclient.info/",
  },
]

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
        <div className={styles.cardList}>
          <List
            rowKey="id"
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={['', ...dataSource]}
            renderItem={item =>
              item ? (
                <List.Item key={item.id}>
                  <Card hoverable className={styles.card} actions={
                    [
                      <a>详情</a>,
                      <a href={item.url} target='_blank' >官网</a>
                    ]
                  }>
                    <Card.Meta
                      avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                      title={<a href="#">{item.title}</a>}
                      description={
                        <Ellipsis className={styles.item} lines={3}>
                          {item.description}
                        </Ellipsis>
                      }
                    />
                  </Card>
                </List.Item>
              ) : (
                <List.Item>
                  <Button type="dashed" className={styles.newButton}>
                    <Icon type="plus" /> 新增产品
                  </Button>
                </List.Item>
              )
            }
          />
        </div>
      </PageHeaderLayout>
    );
  }
}
