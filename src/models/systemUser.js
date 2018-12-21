import { authUserList, authUserCreate, authUserUpdate, authUserDelete } from '@/services/system';

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
    // 菜单-列表
    *fetchAuthUserList({ callback, payload }, { call, put }) {
      const response = yield call(authUserList, payload);
      yield put({
        type: 'authUserList',
        payload: {
          response,
          payload,
        },

      });

      console.log('response', response);

      callback && callback(response); // 回调
    },
    // 菜单-新增
    *fetchAuthUserCreate({ callback, payload }, { call, put }) {
      const response = yield call(authUserCreate, payload);
      yield put({
        type: 'authUserCreate',
        payload: response,
      });

      console.log('response', response);

      callback && callback(response); // 回调
    },
    // 菜单-更新
    *fetchAuthUserUpdate({ callback, payload }, { call, put }) {
      const response = yield call(authUserUpdate, );
      yield put({
        type: 'authUserUpdate',
        payload: response,
      });

      console.log('response', response);

      callback && callback(response); // 回调
    },
    // 菜单-删除
    *fetchAuthUserDelete({ callback, payload }, { call, put }) {
      const response = yield call(authUserDelete, payload);
      yield put({
        type: 'authUserDelete',
        payload: response,
      });

      console.log('response', response);

      callback && callback(response); // 回调
    },
  },

  reducers: {
    authUserList(state, action) {
      console.log('action.payload', action.payload)
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
  },
};
