import { authMenuList, authMenuCreate, authMenuUpdate, authMenuDelete } from '@/services/system';

export default {
  namespace: 'systemUser',

  state: {
    dataSource: [],
    pageCurrent: 1,
    pageSize: 10,
    // authMenuListArr: [],
  },

  effects: {
    // 菜单-列表
    *fetchAuthMenuList({ callback, payload }, { call, put }) {
      const response = yield call(authMenuList, payload);
      yield put({
        type: 'authMenuList',
        payload: response,
      });

      console.log('response', response);

      callback && callback(response); // 回调
    },
    // 菜单-新增
    *fetchAuthMenuCreate({ callback, payload }, { call, put }) {
      const response = yield call(authMenuCreate, payload);
      yield put({
        type: 'authMenuCreate',
        payload: response,
      });

      console.log('response', response);

      callback && callback(response); // 回调
    },
    // 菜单-更新
    *fetchAuthMenuUpdate({ callback, payload }, { call, put }) {
      const response = yield call(authMenuUpdate, );
      yield put({
        type: 'authMenuUpdate',
        payload: response,
      });

      console.log('response', response);

      callback && callback(response); // 回调
    },
    // 菜单-删除
    *fetchAuthMenuDelete({ callback, payload }, { call, put }) {
      const response = yield call(authMenuDelete, payload);
      yield put({
        type: 'authMenuDelete',
        payload: response,
      });

      console.log('response', response);

      callback && callback(response); // 回调
    },
  },

  reducers: {
    authMenuList(state, action) {
      return {
        ...state,
        dataSource: action.payload.data.fnList,
        // authMenuListArr: action.payload.data.list,
      };
    },
    authMenuCreate(state, action) {
      return {
        ...state,
      };
    },
    authMenuUpdate(state, action) {
      return {
        ...state,
      };
    },
    authMenuDelete(state, action) {
      return {
        ...state,
      };
    },
  },
};
