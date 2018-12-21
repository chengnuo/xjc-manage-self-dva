import { authRoleList, authRoleCreate, authRoleUpdate, authRoleDelete } from '@/services/system';

export default {
  namespace: 'systemRole',

  state: {
    dataSource: [],
    pageCurrent: 1,
    pageSize: 10,
    total: 0,
    // authMenuListArr: [],
  },

  effects: {
    // 菜单-列表
    *fetchAuthRoleList({ callback, payload }, { call, put }) {
      const response = yield call(authRoleList, payload);
      yield put({
        type: 'authRoleList',
        payload: {
          response,
          payload,
        },

      });

      console.log('response', response);

      callback && callback(response); // 回调
    },
    // 菜单-新增
    *fetchAuthRoleCreate({ callback, payload }, { call, put }) {
      const response = yield call(authRoleCreate, payload);
      yield put({
        type: 'authRoleCreate',
        payload: response,
      });

      console.log('response', response);

      callback && callback(response); // 回调
    },
    // 菜单-更新
    *fetchAuthRoleUpdate({ callback, payload }, { call, put }) {
      const response = yield call(authRoleUpdate, payload);
      yield put({
        type: 'authRoleUpdate',
        payload: response,
      });

      console.log('response', response);

      callback && callback(response); // 回调
    },
    // 菜单-删除
    *fetchAuthRoleDelete({ callback, payload }, { call, put }) {
      const response = yield call(authRoleDelete, payload);
      yield put({
        type: 'authRoleDelete',
        payload: response,
      });

      console.log('response', response);

      callback && callback(response); // 回调
    },
  },

  reducers: {
    authRoleList(state, action) {
      console.log('action.payload', action.payload)
      return {
        ...state,
        dataSource: action.payload.response.data.list,
        total: action.payload.response.data.total,
        pageCurrent: action.payload.payload.pageCurrent,
        pageSize: action.payload.payload.pageSize,
      };
    },
    authRoleCreate(state, action) {
      return {
        ...state,
      };
    },
    authRoleUpdate(state, action) {
      return {
        ...state,
      };
    },
    authRoleDelete(state, action) {
      return {
        ...state,
      };
    },
  },
};
