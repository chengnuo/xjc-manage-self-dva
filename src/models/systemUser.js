import { authUserList, authUserCreate, authUserUpdate, authUserDelete, authUserSetRoles } from '@/services/system';

export default {
  namespace: 'systemUser',

  state: {
    dataSource: [],
    pageCurrent: 1,
    pageSize: 10,
    total: 0,
    // authMenuListArr: [],
  },

  effects: {
    // 用户-列表
    *fetchAuthUserList({ callback, payload }, { call, put }) {
      const response = yield call(authUserList, payload);
      yield put({
        type: 'authUserList',
        payload: {
          response,
          payload,
        },

      });


      callback && callback(response); // 回调
    },
    // 用户-新增
    *fetchAuthUserCreate({ callback, payload }, { call, put }) {
      const response = yield call(authUserCreate, payload);
      yield put({
        type: 'authUserCreate',
        payload: response,
      });


      callback && callback(response); // 回调
    },
    // 用户-更新
    *fetchAuthUserUpdate({ callback, payload }, { call, put }) {
      const response = yield call(authUserUpdate, payload);
      yield put({
        type: 'authUserUpdate',
        payload: response,
      });


      callback && callback(response); // 回调
    },
    // 用户-删除
    *fetchAuthUserDelete({ callback, payload }, { call, put }) {
      const response = yield call(authUserDelete, payload);
      yield put({
        type: 'authUserDelete',
        payload: response,
      });


      callback && callback(response); // 回调
    },
    // 用户-设置角色
    *fetchAuthUserSetRoles({ callback, payload }, { call, put }) {
      const response = yield call(authUserSetRoles, payload);
      yield put({
        type: 'authUserSetRoles',
        payload: response,
      });


      callback && callback(response); // 回调
    },

  },

  reducers: {
    authUserList(state, action) {
      return {
        ...state,
        dataSource: action.payload.response.data.list,
        total: action.payload.response.data.total,
        pageCurrent: action.payload.payload.pageCurrent,
        pageSize: action.payload.payload.pageSize,
      };
    },
    authUserCreate(state, action) {
      return {
        ...state,
      };
    },
    authUserUpdate(state, action) {
      return {
        ...state,
      };
    },
    authUserDelete(state, action) {
      return {
        ...state,
      };
    },
    authUserSetRoles(state, action) {
      return {
        ...state,
      };
    },
  },
};
