import { getUsers, postUsers, putUsers, deleteUsers, setRoles, setRolesList } from '../services/users';

export default {
  namespace: 'users',

  state: {
    list: [],
    total: 0,
    // 搜索参数
    pageCurrent: 1,
    pageSize: 10,
    setRolesList: [], // 设置角色列表
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
    *fetchPostUsers({ payload, callback },{ call, put }) {
      const response = yield call(postUsers, payload);
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
    *fetchPutUsers({ payload, callback }, { call, put }) {

      const response = yield call(putUsers, payload);
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
    *fetchDeleteUsers({ payload, callback }, { call, put }) {

      const response = yield call(deleteUsers, payload);
      yield put({
        type: 'deleteUser',
        payload: {
          response,
          payload,
        },
      });

      if (callback) callback();
    },
    // 设置setRoles列表
    *fetchSetRolesList({ payload, callback }, { call, put }) {

      const response = yield call(setRolesList, payload);
      yield put({
        type: 'setRolesList',
        payload: {
          response,
          payload,
        },
      });

      if (callback) callback();
    },
    // 设置setRoles
    *setRoles({ payload, callback }, { call, put }) {

      const response = yield call(setRoles, payload);
      yield put({
        type: 'setRoles',
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
    // 设置setRolesList
    setRolesList(state, action) {
      console.log('action',action);
      return {
        ...state,
        setRolesList: action.payload.response.data.list,
      };
    },
    // 设置setRolesList
    setRoles(state, action) {
      console.log('action',action);
      return {
        ...state,
      };
    },
  },
};
