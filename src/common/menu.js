import { isUrl } from '../utils/utils';

const menuData = [
  // {
  //   name: 'dashboard',
  //   icon: 'dashboard',
  //   path: 'dashboard',
  //   children: [
  //     {
  //       name: '分析页',
  //       path: 'analysis',
  //     },
  //     {
  //       name: '监控页',
  //       path: 'monitor',
  //     },
  //     {
  //       name: '工作台',
  //       path: 'workplace',
  //       // hideInBreadcrumb: true,
  //       // hideInMenu: true,
  //     },
  //   ],
  // },
  // {
  //   name: '表单页',
  //   icon: 'form',
  //   path: 'form',
  //   children: [
  //     {
  //       name: '基础表单',
  //       path: 'basic-form',
  //     },
  //     {
  //       name: '分步表单',
  //       path: 'step-form',
  //     },
  //     {
  //       name: '高级表单',
  //       authority: 'admin',
  //       path: 'advanced-form',
  //     },
  //   ],
  // },
  // {
  //   name: '列表页',
  //   icon: 'table',
  //   path: 'list',
  //   children: [
  //     {
  //       name: '查询表格',
  //       path: 'table-list',
  //     },
  //     {
  //       name: '标准列表',
  //       path: 'basic-list',
  //     },
  //     {
  //       name: '卡片列表',
  //       path: 'card-list',
  //     },
  //     {
  //       name: '搜索列表',
  //       path: 'search',
  //       children: [
  //         {
  //           name: '搜索列表（文章）',
  //           path: 'articles',
  //         },
  //         {
  //           name: '搜索列表（项目）',
  //           path: 'projects',
  //         },
  //         {
  //           name: '搜索列表（应用）',
  //           path: 'applications',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: '详情页',
  //   icon: 'profile',
  //   path: 'profile',
  //   children: [
  //     {
  //       name: '基础详情页',
  //       path: 'basic',
  //     },
  //     {
  //       name: '高级详情页',
  //       path: 'advanced',
  //       authority: 'admin',
  //     },
  //   ],
  // },
  // {
  //   name: '结果页',
  //   icon: 'check-circle-o',
  //   path: 'result',
  //   children: [
  //     {
  //       name: '成功',
  //       path: 'success',
  //     },
  //     {
  //       name: '失败',
  //       path: 'fail',
  //     },
  //   ],
  // },
  // {
  //   name: '异常页',
  //   icon: 'warning',
  //   path: 'exception',
  //   children: [
  //     {
  //       name: '403',
  //       path: '403',
  //     },
  //     {
  //       name: '404',
  //       path: '404',
  //     },
  //     {
  //       name: '500',
  //       path: '500',
  //     },
  //     {
  //       name: '触发异常',
  //       path: 'trigger',
  //       hideInMenu: true,
  //     },
  //   ],
  // },
  {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: '登录',
        path: 'login',
      },
      {
        name: '注册',
        path: 'register',
      },
      {
        name: '注册结果',
        path: 'register-result',
      },
    ],
  },
  {
    name: '用户管理',
    icon: 'user',
    path: 'users',
    children: [
      {
        name: '用户列表',
        path: 'users/list',
      },
      {
        name: '角色列表',
        path: 'roles/list',
      },
      {
        name: '权限列表',
        path: 'access/list',
      },
    ],
  },
  {
    name: '博客管理',
    icon: 'book',
    path: 'blogs',
    children: [
      {
        name: '博客列表',
        path: 'list',
      },
    ],
  },
  {
    name: '计划管理',
    icon: 'tag-o',
    path: 'plans',
    children: [
      {
        name: '计划列表',
        path: 'list',
      },
    ],
  },
  {
    name: '读书管理',
    icon: 'tag-o',
    path: 'plans2',
    children: [
      {
        name: '计划列表',
        path: 'list',
      },
    ],
  },
  {
    name: '审核管理',
    icon: 'tag-o',
    path: 'plans3',
    children: [
      {
        name: '计划列表',
        path: 'list',
      },
    ],
  },
  {
    name: '网站导航管理',
    icon: 'tag-o',
    path: 'plans4',
    children: [
      {
        name: '计划列表',
        path: 'list',
      },
    ],
  },
  {
    name: '工具管理',
    icon: 'tag-o',
    path: 'plans5',
    children: [
      {
        name: '计划列表',
        path: 'list',
      },
    ],
  },
  {
    name: '面试题管理',
    icon: 'tag-o',
    path: 'plans6',
    children: [
      {
        name: '计划列表',
        path: 'list',
      },
    ],
  },
  {
    name: '朋友画像管理',
    icon: 'tag-o',
    path: 'plans7',
    children: [
      {
        name: '计划列表',
        path: 'list',
      },
    ],
  },
  {
    name: '全栈系列',
    icon: 'tag-o',
    path: 'plans8',
    children: [
      {
        name: 'vue列表',
        path: 'list',
      },
      {
        name: 'react列表',
        path: 'list2',
      },
      {
        name: 'ng列表',
        path: 'list3',
      },
    ],
  },
  {
    name: '黑名单管理',
    icon: 'tag-o',
    path: 'plans9',
    children: [
      {
        name: '计划列表',
        path: 'list',
      },
    ],
  },
  {
    name: '爱好管理',
    icon: 'tag-o',
    path: 'plans10',
    children: [
      {
        name: '影视列表',
        path: 'list',
      },
      {
        name: '音乐列表',
        path: 'list2',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
