import { authRoleList, authRoleCreate, authRoleUpdate, authRoleDelete, authRoleSetAccessList, authRoleSetAccess } from '@/services/system';

export default {
  namespace: 'systemRole',
  state: {
    dataSource: [],
    pageCurrent: 1,
    pageSize: 10,
    total: 0,
    // authMenuListArr: [],
    userAccessList: [],
  },
  effects: {
    // 角色-列表
    *fetchAuthRoleList({ callback, payload }, { call, put }) {
      const response = yield call(authRoleList, payload);
      yield put({
        type: 'authRoleList',
        payload: {
          response,
          payload,
        },

      });
      callback && callback(response); // 回调
    },
    // 角色-新增
    *fetchAuthRoleCreate({ callback, payload }, { call, put }) {
      const response = yield call(authRoleCreate, payload);
      yield put({
        type: 'authRoleCreate',
        payload: response,
      });



      callback && callback(response); // 回调
    },
    // 角色-更新
    *fetchAuthRoleUpdate({ callback, payload }, { call, put }) {
      const response = yield call(authRoleUpdate, payload);
      yield put({
        type: 'authRoleUpdate',
        payload: response,
      });



      callback && callback(response); // 回调
    },
    // 角色-删除
    *fetchAuthRoleDelete({ callback, payload }, { call, put }) {
      const response = yield call(authRoleDelete, payload);
      yield put({
        type: 'authRoleDelete',
        payload: {
          response: JSON.parse(response)
        },
      });
      callback && callback(JSON.parse(response)); // 回调
    },
    // 角色权限-列表
    *fetchAuthRoleSetAccessList({ callback, payload }, { call, put }) {
      const response = yield call(authRoleSetAccessList, payload);
      yield put({
        type: 'authRoleSetAccessList',
        payload: response,
      });



      callback && callback(response); // 回调
    },
    // 角色权限-设置
    *fetchAuthRoleSetAccess({ callback, payload }, { call, put }) {
      const response = yield call(authRoleSetAccess, payload);
      yield put({
        type: 'authRoleSetAccess',
        payload: response,
      });



      callback && callback(response); // 回调
    },

  },

  reducers: {
    authRoleList(state, action) {

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
    authRoleSetAccessList(state, action) {
      return {
        ...state,
        userAccessList: action.payload.data.userAccessList,
      };
    },
    authRoleSetAccess(state, action) {
      return {
        ...state,
      };
    },

  },
};
