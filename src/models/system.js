import { authMenuList, authMenuCreate, authMenuUpdate, authMenuDelete } from '@/services/system';

export default {
  namespace: 'system',

  state: {
    authMenuList: [],
  },

  effects: {
    // 菜单列表
    *fetchAuthMenuList(_, { call, put }) {
      const response = yield call(authMenuList);
      yield put({
        type: 'authMenuList',
        payload: response,
      });
    },
  },

  reducers: {
    authMenuList(state, action) {
      return {
        ...state,
        authMenuList: action.payload.data.fnList,
      };
    },
  },
};
