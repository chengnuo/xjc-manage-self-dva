import { authMenuList, authMenuCreate, authMenuUpdate, authMenuDelete } from '@/services/system';

export default {
  namespace: 'system',

  state: {
    authMenuListTree: [],
    authMenuListArr: [],
  },

  effects: {
    // 菜单列表
    *fetchAuthMenuList({ callback }, { call, put }) {
      const response = yield call(authMenuList);
      yield put({
        type: 'authMenuList',
        payload: response,
      });

      console.log('response', response)

      if (callback && response.status === 200 ) callback(); // 新增的时候必须等于200才跳转
    },
  },

  reducers: {
    authMenuList(state, action) {
      return {
        ...state,
        authMenuListTree: action.payload.data.fnList,
        authMenuListArr: action.payload.data.list,
      };
    },
  },
};
