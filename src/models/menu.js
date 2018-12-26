import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import { formatMessage } from 'umi/locale';
import Authorized from '@/utils/Authorized';

const { check } = Authorized;

// Conversion router to menu.
function formatter(data, parentAuthority, parentName) {
  return data
    .map(item => {
      if (!item.name || !item.path) {
        return null;
      }

      let locale = 'menu';
      if (parentName) {
        locale = `${parentName}.${item.name}`;
      } else {
        locale = `menu.${item.name}`;
      }

      const result = {
        ...item,
        name: formatMessage({ id: locale, defaultMessage: item.name }),
        locale,
        authority: item.authority || parentAuthority,
      };
      if (item.routes) {
        const children = formatter(item.routes, item.authority, locale);
        // Reduce memory usage
        result.children = children;
      }
      delete result.routes;
      return result;
    })
    .filter(item => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

/**
 * get SubMenu or Item
 */
const getSubMenu = item => {
  // doc: add hideChildrenInMenu
  if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
    return {
      ...item,
      children: filterMenuData(item.children), // eslint-disable-line
    };
  }
  return item;
};

/**
 * filter menuData
 */
const filterMenuData = menuData => {
  if (!menuData) {
    return [];
  }
  return menuData
    .filter(item => item.name && !item.hideInMenu)
    .map(item => check(item.authority, getSubMenu(item)))
    .filter(item => item);
};
/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
const getBreadcrumbNameMap = menuData => {
  const routerMap = {};

  const flattenMenuData = data => {
    data.forEach(menuItem => {
      if (menuItem.children) {
        flattenMenuData(menuItem.children);
      }
      // Reduce memory usage
      routerMap[menuItem.path] = menuItem;
    });
  };
  flattenMenuData(menuData);
  return routerMap;
};

const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual);

export default {
  namespace: 'menu',

  state: {
    menuData: [],
    breadcrumbNameMap: {},
  },

  effects: {
    *getMenuData({ payload }, { put }) {
      const { routes, authority } = payload;

      console.log('routes', routes , authority)

      let xxxRoutes = [
        {
          path: '/system',
          name: '系统管理',
          icon: 'appstore',
          children: [
            {
              path: '/system/UserList',
              name: 'user',
              children: [
                {
                  path: '/system/UserList',
                  name: 'userList',
                },
              ],
            },
            {
              path: '/system/RoleList',
              name: 'role',
              children: [
                {
                  path: '/system/RoleList',
                  name: 'roleList',
                },
              ],
            },
            {
              path: '/system/AccessList',
              name: 'access',
              children: [
                {
                  path: '/system/AccessList',
                  name: 'accessList',
                },
              ],
            },
            {
              path: '/system/test',
              name: 'test',
              children: [
                {
                  path: '/system/test/TestList',
                  name: 'testList',
                },
                {
                  path: '/system/test/TestList2',
                  name: 'testList2',
                },
              ],
            },
          ],
        },
      ]

      let xxxRoutes2 = [
        {
          "id": 18,
          "path": "/system",
          "name": "系统管理",
          "pid": 0,
          "children": [
            {
              "id": 19,
              "path": "/user",
              "name": "用户管理",
              "pid": 18,
              "children": [
                {
                  "id": 20,
                  "path": "/system/UserList",
                  "name": "用户列表",
                  "pid": 19
                }
              ]
            },
            {
              "id": 21,
              "path": "/role",
              "name": "角色管理",
              "pid": 18,
              "children": [
                {
                  "id": 22,
                  "path": "/system/RoleList",
                  "name": "角色列表",
                  "pid": 21
                }
              ]
            },
            {
              "id": 23,
              "path": "/access",
              "name": "权限管理",
              "pid": 18,
              "children": [
                {
                  "id": 24,
                  "path": "/system/AccessList",
                  "name": "权限列表",
                  "pid": 23
                }
              ]
            },
            {
              "id": 25,
              "path": "/test",
              "name": "测试管理",
              "pid": 18,
              "children": [
                {
                  "id": 26,
                  "path": "/system/test/TestList",
                  "name": "测试列表",
                  "pid": 25
                },
                {
                  "id": 27,
                  "path": "/system/test/TestList2",
                  "name": "测试列表2",
                  "pid": 25
                },
                {
                  "id": 30,
                  "path": null,
                  "name": "测试3",
                  "pid": 25
                }
              ]
            }
          ]
        }
      ]

      // const menuData = filterMenuData(memoizeOneFormatter(routes, authority));
      const menuData = xxxRoutes2;

      console.log('menuData', xxxRoutes)
      const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(menuData);
      yield put({
        type: 'save',
        payload: { menuData, breadcrumbNameMap },
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
