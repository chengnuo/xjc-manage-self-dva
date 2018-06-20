import { getPlans, postPlans, putPlans, deletePlans } from '../services/plans';

export default {
  namespace: 'plans',

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
    *fetchGetPlans({ payload },{ call, put }) {
      const response = yield call(getPlans, payload);
      yield put({
        type: 'list',
        payload: {
          response,
          payload,
        },
      });
    },
    // 新增
    *fetchPostPlans({ payload, callback },{ call, put }) {
      const response = yield call(postPlans, payload);
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
    *fetchPutPlans({ payload, callback }, { call, put }) {

      const response = yield call(putPlans, payload);
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
    *fetchDeletePlans({ payload, callback }, { call, put }) {

      const response = yield call(deletePlans, payload);
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
