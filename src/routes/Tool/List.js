import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Collapse, Divider, List, Card, Button, Icon } from 'antd';
import ggfwzsLogo from './../../assets/images/ggfwzsLogo.png'; // ggfwzsLogo
import fehelperIcon from './../../assets/images/fehelperLogo.png'; // fehelperLogo
import switchHostsLogo from './../../assets/images/switchHostsLogo.png'; // switchHostsLogo

import styles from './CardList.less';
import Ellipsis from 'components/Ellipsis';

const Panel = Collapse.Panel;


// 前端fehelper助手
const fehelperData = [
  {
    title: '网站',
    description: '',
    href: 'https://www.baidufe.com/fehelper/feedback.html',
    icon: fehelperIcon,
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
// const dataSource = [
//   {
//     "id": "fake-list-0",
//     "owner": "付小小",
//     "title": "Alipay",
//     "avatar": "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
//     "cover": "https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png",
//     "status": "active",
//     "percent": 81,
//     "logo": "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
//     "href": "https://ant.design",
//     "updatedAt": "2018-07-01T05:42:27.643Z",
//     "createdAt": "2018-07-01T05:42:27.643Z",
//     "subDescription": "那是一种内在的东西， 他们到达不了，也无法触及的",
//     "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//     "activeUser": 184390,
//     "newUser": 1370,
//     "star": 149,
//     "like": 157,
//     "message": 20,
//     "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//     "members": [
//       {
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//         "name": "曲丽丽"
//       },
//       {
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//         "name": "王昭君"
//       },
//       {
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//         "name": "董娜娜"
//       }
//     ]
//   },
//   {
//     "id": "fake-list-1",
//     "owner": "曲丽丽",
//     "title": "Angular",
//     "avatar": "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
//     "cover": "https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png",
//     "status": "exception",
//     "percent": 82,
//     "logo": "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
//     "href": "https://ant.design",
//     "updatedAt": "2018-07-01T03:42:27.643Z",
//     "createdAt": "2018-07-01T03:42:27.643Z",
//     "subDescription": "希望是一个好东西，也许是最好的，好东西是不会消亡的",
//     "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//     "activeUser": 100339,
//     "newUser": 1746,
//     "star": 194,
//     "like": 147,
//     "message": 15,
//     "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//     "members": [
//       {
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//         "name": "曲丽丽"
//       },
//       {
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//         "name": "王昭君"
//       },
//       {
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//         "name": "董娜娜"
//       }
//     ]
//   },
//   {
//     "id": "fake-list-2",
//     "owner": "林东东",
//     "title": "Ant Design",
//     "avatar": "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",
//     "cover": "https://gw.alipayobjects.com/zos/rmsportal/uVZonEtjWwmUZPBQfycs.png",
//     "status": "normal",
//     "percent": 66,
//     "logo": "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",
//     "href": "https://ant.design",
//     "updatedAt": "2018-07-01T01:42:27.643Z",
//     "createdAt": "2018-07-01T01:42:27.643Z",
//     "subDescription": "生命就像一盒巧克力，结果往往出人意料",
//     "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//     "activeUser": 130027,
//     "newUser": 1841,
//     "star": 181,
//     "like": 148,
//     "message": 15,
//     "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//     "members": [
//       {
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//         "name": "曲丽丽"
//       },
//       {
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//         "name": "王昭君"
//       },
//       {
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//         "name": "董娜娜"
//       }
//     ]
//   },
//   {
//     "id": "fake-list-3",
//     "owner": "周星星",
//     "title": "Ant Design Pro",
//     "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png",
//     "cover": "https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png",
//     "status": "active",
//     "percent": 83,
//     "logo": "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png",
//     "href": "https://ant.design",
//     "updatedAt": "2018-06-30T23:42:27.643Z",
//     "createdAt": "2018-06-30T23:42:27.643Z",
//     "subDescription": "城镇中有那么多的酒馆，她却偏偏走进了我的酒馆",
//     "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//     "activeUser": 157571,
//     "newUser": 1646,
//     "star": 192,
//     "like": 183,
//     "message": 15,
//     "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//     "members": [
//       {
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//         "name": "曲丽丽"
//       },
//       {
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//         "name": "王昭君"
//       },
//       {
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//         "name": "董娜娜"
//       }
//     ]
//   },
//   {
//     "id": "fake-list-4",
//     "owner": "吴加好",
//     "title": "Bootstrap",
//     "avatar": "https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png",
//     "cover": "https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png",
//     "status": "exception",
//     "percent": 77,
//     "logo": "https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png",
//     "href": "https://ant.design",
//     "updatedAt": "2018-06-30T21:42:27.643Z",
//     "createdAt": "2018-06-30T21:42:27.643Z",
//     "subDescription": "那时候我只会想自己想要什么，从不想自己拥有什么",
//     "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//     "activeUser": 118133,
//     "newUser": 1545,
//     "star": 135,
//     "like": 124,
//     "message": 15,
//     "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//     "members": [
//       {
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//         "name": "曲丽丽"
//       },
//       {
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//         "name": "王昭君"
//       },
//       {
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//         "name": "董娜娜"
//       }
//     ]
//   },
//   {
//     "id": "fake-list-5",
//     "owner": "朱偏右",
//     "title": "React",
//     "avatar": "https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png",
//     "cover": "https://gw.alipayobjects.com/zos/rmsportal/uVZonEtjWwmUZPBQfycs.png",
//     "status": "normal",
//     "percent": 83,
//     "logo": "https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png",
//     "href": "https://ant.design",
//     "updatedAt": "2018-06-30T19:42:27.643Z",
//     "createdAt": "2018-06-30T19:42:27.643Z",
//     "subDescription": "那是一种内在的东西， 他们到达不了，也无法触及的",
//     "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//     "activeUser": 186172,
//     "newUser": 1361,
//     "star": 169,
//     "like": 105,
//     "message": 13,
//     "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//     "members": [
//       {
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//         "name": "曲丽丽"
//       },
//       {
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//         "name": "王昭君"
//       },
//       {
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//         "name": "董娜娜"
//       }
//     ]
//   },
//   {
//     "id": "fake-list-6",
//     "owner": "鱼酱",
//     "title": "Vue",
//     "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png",
//     "cover": "https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png",
//     "status": "active",
//     "percent": 56,
//     "logo": "https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png",
//     "href": "https://ant.design",
//     "updatedAt": "2018-06-30T17:42:27.643Z",
//     "createdAt": "2018-06-30T17:42:27.643Z",
//     "subDescription": "希望是一个好东西，也许是最好的，好东西是不会消亡的",
//     "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//     "activeUser": 121947,
//     "newUser": 1040,
//     "star": 144,
//     "like": 113,
//     "message": 15,
//     "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//     "members": [
//       {
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//         "name": "曲丽丽"
//       },
//       {
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//         "name": "王昭君"
//       },
//       {
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//         "name": "董娜娜"
//       }
//     ]
//   },
//   {
//     "id": "fake-list-7",
//     "owner": "乐哥",
//     "title": "Webpack",
//     "avatar": "https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png",
//     "cover": "https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png",
//     "status": "exception",
//     "percent": 72,
//     "logo": "https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png",
//     "href": "https://ant.design",
//     "updatedAt": "2018-06-30T15:42:27.643Z",
//     "createdAt": "2018-06-30T15:42:27.643Z",
//     "subDescription": "生命就像一盒巧克力，结果往往出人意料",
//     "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
//     "activeUser": 178854,
//     "newUser": 1749,
//     "star": 191,
//     "like": 167,
//     "message": 18,
//     "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
//     "members": [
//       {
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
//         "name": "曲丽丽"
//       },
//       {
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
//         "name": "王昭君"
//       },
//       {
//         "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
//         "name": "董娜娜"
//       }
//     ]
//   }
// ]

const dataSource = [
  {
    "id": "fake-list-11",
    "title": "谷歌访问助手",
    "avatar": ggfwzsLogo,
    "description": "谷歌chrome浏览器商店，gmail邮箱提供加速服务，解决偶尔打不开的问题",
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
                      <a href='http://www.ggfwzs.com/' target='_blank' >官网</a>
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
