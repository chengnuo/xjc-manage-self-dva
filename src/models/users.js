import { query as queryUsers } from '../services/user';

export default {
  namespace: 'users',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetchQueryUsers(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'list',
        payload: response,
      });
    },
  },

  reducers: {
    // 列表
    list(state, action) {
      console.log('action',action);
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
