import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import { formatMessage } from 'umi/locale';
import Authorized from '@/utils/Authorized';
import { menuGetMenuList } from '@/services/menu';

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
      // 系统路由，先注释
      // if (item.routes) {
      //   const children = formatter(item.routes, item.authority, locale);
      //   // Reduce memory usage
      //   result.children = children;
      // }

      // 这里是自己的路由
      if (item.children) {
        const children = formatter(item.children, item.authority, locale);
        // Reduce memory usage
        result.children = children;
      }

      // console.log('result', result)
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
      // const menuData = filterMenuData(memoizeOneFormatter(routes, authority));

      let xjc = JSON.parse(window.localStorage.getItem('xjc'));
      let xjcMenu = xjc && xjc.menu || []


      // console.log('xjcMenu', xjcMenu)

      let xxxRoutes2 = [
        {
          "id": 18,
          "path": "/system",
          "menuname": "系统管理",
          "name": "system",
          "pid": 0,
          "children": [
            {
              "id": 19,
              "path": "/system/UserList",
              "menuname": "用户管理",
              "name": "user",
              "pid": 18,
              "children": [
                {
                  "id": 20,
                  "path": "/system/UserList",
                  "menuname": "用户列表",
                  "name": "userList",
                  "pid": 19
                }
              ]
            },
            {
              "id": 21,
              "path": "/system/RoleList",
              "menuname": "角色管理",
              "name": "role",
              "pid": 18,
              "children": [
                {
                  "id": 22,
                  "path": "/system/RoleList",
                  "menuname": "角色列表",
                  "name": "roleList",
                  "pid": 21
                }
              ]
            },
            {
              "id": 23,
              "path": "/system/AccessList",
              "menuname": "权限管理",
              "name": "access",
              "pid": 18,
              "children": [
                {
                  "id": 24,
                  "path": "/system/AccessList",
                  "menuname": "权限列表",
                  "name": "accessList",
                  "pid": 23
                }
              ]
            },
            {
              "id": 25,
              "path": "/system/test",
              "menuname": "测试管理",
              "name": "test",
              "pid": 18,
              "children": [
                {
                  "id": 26,
                  "path": "/system/test/TestList",
                  "menuname": "测试列表",
                  "name": "testList",
                  "pid": 25
                },
                {
                  "id": 27,
                  "path": "/system/test/TestList2",
                  "menuname": "测试列表2",
                  "name": "testList2",
                  "pid": 25
                },
                {
                  "id": 30,
                  "path": null,
                  "menuname": "测试3",
                  "name": null,
                  "pid": 25
                }
              ]
            }
          ]
        }
      ]

      let xxxRoutes3 = [
        {
          "id": 6,
          "url": "system",
          "method": "",
          "menuname": "system",
          "name": "系统管理",
          "pid": 0,
          "path": "/system",
          "children": [
            {
              "id": 7,
              "url": "user",
              "method": "",
              "menuname": "user",
              "name": "用户管理",
              "pid": 6,
              "path": "/system/UserList",
              "children": [
                {
                  "id": 8,
                  "url": "/api/v1/user",
                  "method": "GET",
                  "menuname": "/system/UserList",
                  "name": "用户列表",
                  "pid": 7,
                  "path": "/system/UserList",
                  "locale": "menu.system.user.userList"
                }
              ],
              "locale": "menu.system.user"
            },
            {
              "id": 12,
              "url": "role",
              "method": "",
              "menuname": "role",
              "name": "角色管理",
              "pid": 6,
              "path": "role",
              "children": [
                {
                  "id": 13,
                  "url": "/api/v1/role",
                  "method": "GET",
                  "menuname": "/system/RoleList",
                  "name": "角色列表",
                  "pid": 12,
                  "path": "/system/RoleList",
                  "locale": "menu.system.role.roleList"
                }
              ],
              "locale": "menu.system.role"
            },
            {
              "id": 17,
              "url": "access",
              "method": "",
              "menuname": "access",
              "name": "权限管理",
              "pid": 6,
              "path": "access",
              "children": [
                {
                  "id": 18,
                  "url": "/api/v1/access",
                  "method": "GET",
                  "menuname": "/system/AccessList",
                  "name": "权限列表",
                  "pid": 17,
                  "path": "/system/AccessList",
                  "locale": "menu.system.access.accessList"
                }
              ],
              "locale": "menu.system.access"
            },
            {
              "id": 22,
              "url": "test",
              "method": "",
              "menuname": "test",
              "name": "测试管理",
              "pid": 6,
              "path": "test",
              "children": [
                {
                  "id": 23,
                  "url": "ceshiliebiao",
                  "method": "",
                  "menuname": "/system/test/TestList",
                  "name": "测试列表",
                  "pid": 22,
                  "path": "/system/test/TestList",
                  "locale": "menu.system.test.testList"
                },
                {
                  "id": 24,
                  "url": "ceshiliebiao2",
                  "method": "",
                  "menuname": "/system/test/TestList2",
                  "name": "测试列表2",
                  "pid": 22,
                  "path": "/system/test/TestList2",
                  "locale": "menu.system.test.testList2"
                }
              ],
              "locale": "menu.system.test"
            }
          ],
          "locale": "menu.system"
        }
      ]

      const menuData = filterMenuData(memoizeOneFormatter(xjcMenu, authority));
      // const menuData = filterMenuData(memoizeOneFormatter(xxxRoutes2, authority));
      // const menuData = filterMenuData(memoizeOneFormatter(xxxRoutes3, authority));

      const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(menuData);
      yield put({
        type: 'save',
        payload: {
          // menuData, // 这里注释掉了，所以不会显示
          menuData, // 这里注释掉了，所以不会显示
          breadcrumbNameMap
        },
      });
    },
    // 登录获取菜单
    *fetchGetMenuList({ callback, payload }, { call, put }) {
      const response = yield call(menuGetMenuList, payload);
      yield put({
        type: 'getMenuList',
        payload: {
          response,
        },
      });
      //
      if(response.status === 200){
        window.localStorage.setItem('xjc', JSON.stringify({
          menu: response.farmatAccessMenu,
        }));
      }
      // console.log('getMenuList', response)

      callback && callback(response); // 回调
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    getMenuList(state, action) {
      const menuData = filterMenuData(memoizeOneFormatter(action.payload.response.farmatAccessMenu));
      return {
        ...state,
        menuData,
      };
    },
  },
};
