import { queryUsers } from '../services/users';

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
    *fetchQueryUsers({ payload },{ call, put }) {
      const response = yield call(queryUsers, payload);
      yield put({
        type: 'list',
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
  },
};
