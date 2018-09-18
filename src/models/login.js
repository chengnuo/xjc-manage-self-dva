import { routerRedux } from 'dva/router';
import { fakeAccountLogin } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    userInfo: {},
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      console.log('response',response)
      // Login successfully
      if (response.status === 200) {
        reloadAuthorized();
        yield put(routerRedux.push('/test/index'));
      }
    },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginOutStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
            userInfo: {},
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      let authority = payload.data.resultAccessMenu.map((item)=>item.name)
      setAuthority(authority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
        userInfo: payload.data,
      };
    },
    changeLoginOutStatus(state, { payload }) {
      setAuthority('guest');
      return {
        ...state,
        status: payload.status,
        type: payload.type,
        userInfo: payload.data,
      };
    },
  },
};
