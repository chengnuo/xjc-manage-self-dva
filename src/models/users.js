import { getUsers, postUsers, putUsers } from '../services/users';

export default {
  namespace: 'users',

  state: {
    list: [],
    total: 0,
    // 搜索参数
    pageCurrent: 1,
    pageSize: 10,
  },

  effects: {
    // 列表
    *fetchGetUsers({ payload },{ call, put }) {
      const response = yield call(getUsers, payload);
      yield put({
        type: 'list',
        payload: {
          response,
          payload,
        },
      });
    },
    // 新增
    *fetchPostUsers({ payload },{ call, put }) {
      const response = yield call(postUsers, payload);
      yield put({
        type: 'create',
        payload: {
          response,
          payload,
        },
      });
    },
    // 更新
    *fetchPutUsers({ payload }, { call, put }) {

      const response = yield call(putUsers, payload);
      yield put({
        type: 'updata',
        payload: {
          response,
          payload,
        },
      });
    },

  },

  reducers: {
    // 列表
    list(state, action) {
      console.log('action',action);
      return {
        ...state,
        list: action.payload.response.data.list,
        total: action.payload.response.data.total,
        pageCurrent: action.payload.payload.pageCurrent,
        pageSize: action.payload.payload.pageSize,
      };
    },
    // 新增
    create(state, action) {
      console.log('action',action);
      return {
        ...state,
      };
    },
    // 新增
    updata(state, action) {
      console.log('action',action);
      return {
        ...state,
      };
    },
  },
};
