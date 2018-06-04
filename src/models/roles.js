import { getRoles, postRoles, putRoles, deleteRoles, setAccess, setAccessList } from '../services/roles';

export default {
  namespace: 'roles',

  state: {
    list: [],
    total: 0,
    // 搜索参数
    pageCurrent: 1,
    pageSize: 10,
    setAccessList: [], // 设置角色列表
    userAccessList: [], // 设置角色列表,选中
  },

  effects: {
    // 列表
    *fetchGetRoles({ payload },{ call, put }) {
      const response = yield call(getRoles, payload);
      yield put({
        type: 'list',
        payload: {
          response,
          payload,
        },
      });
    },
    // 新增
    *fetchPostRoles({ payload, callback },{ call, put }) {
      const response = yield call(postRoles, payload);
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
    *fetchPutRoles({ payload, callback }, { call, put }) {

      const response = yield call(putRoles, payload);
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
    *fetchDeleteRoles({ payload, callback }, { call, put }) {

      const response = yield call(deleteRoles, payload);
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
    *fetchSetAccessList({ payload, callback }, { call, put }) {

      const response = yield call(setAccessList, payload);
      yield put({
        type: 'setAccessList',
        payload: {
          response,
          payload,
        },
      });

      if (callback) callback();
    },
    // 设置setRoles
    *fetchSetAccess({ payload, callback }, { call, put }) {

      const response = yield call(setAccess, payload);
      yield put({
        type: 'setAccess',
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
    setAccessList(state, action) {
      console.log('action',action);
      return {
        ...state,
        setAccessList: action.payload.response.data.list,
        userAccessList: action.payload.response.data.userAccessList,
      };
    },
    // 设置setRolesList
    setAccess(state, action) {
      console.log('action',action);
      return {
        ...state,
      };
    },
  },
};
