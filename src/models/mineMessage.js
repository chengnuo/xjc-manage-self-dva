import { getMessages, postMessages, putMessages, deleteMessages } from '../services/message';

export default {
  namespace: 'mineMessage',

  state: {
    list: [],
    total: 0,
    // 搜索参数
    pageCurrent: 1,
    pageSize: 10,
    setRolesList: [], // 设置角色列表
    userRoleList: [], // 设置角色列表,选中
  },

  effects: {
    // 列表
    *fetchGetMessages({ payload },{ call, put }) {
      console.log('getMessages-models')
      const response = yield call(getMessages, payload);
      yield put({
        type: 'list',
        payload: {
          response,
          payload,
        },
      });
    },
    // 新增
    *fetchPostMessages({ payload, callback },{ call, put }) {
      const response = yield call(postMessages, payload);
      yield put({
        type: 'create',
        payload: {
          response,
          payload,
        },
      });
      if (callback && response.status === 200 ) callback(); // 新增的时候必须等于200才跳转
    },
    // 更新
    *fetchPutMessages({ payload, callback }, { call, put }) {

      const response = yield call(putMessages, payload);
      yield put({
        type: 'updata',
        payload: {
          response,
          payload,
        },
      });

      if (callback) callback();
    },
    // 删除
    *fetchDeleteMessages({ payload, callback }, { call, put }) {

      const response = yield call(deleteMessages, payload);
      yield put({
        type: 'deleteUser',
        payload: {
          response,
          payload,
        },
      });

      if (callback) callback();
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
    // 删除
    deleteUser(state, action) {
      console.log('action',action);
      return {
        ...state,
      };
    },
  },
};
