import * as UserService from '../services/UserService';

export default {

  namespace: 'user',

  state: {
    user: '',
    loginModalVisible: false,
  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
      return history.listen(({pathname, query}) => {
      });
    },
  },

  effects: {
    * fetch({payload}, {call, put}) {  // eslint-disable-line
      yield put({type: 'save'});
    },
    * login({payload: user}, {call, put, select}) {
      const response = yield call(UserService.login, user);
      console.log('login', response);
      // 关闭登录弹出框
      yield put({
        type: 'saveLoginModalVisible',
        payload: {
          loginModalVisible: false,
        },
      });
      // 保存用户信息
      yield put({
        type: 'saveUserLoginInfo',
        payload: {
          user: {},
        },
      });
      // if (response.data.code === HttpMessage.result.SUCCESS) {
      //   message.success(response.data.message);

      //   const userModel = yield select(state => state.user);
      //   if (userModel.isNeedRefresh) {
      //     yield put({
      //       type: 'getUserAllPictures',
      //     });
      //     yield put({
      //       type: 'getUserAllGalleries',
      //     });
      //   }
      // } else {
      //   // 用户名或密码错误
      //   message.error(response.data.message);
      // }
    },
    *getCheckCode({ payload: data }, { call, put }) {
      const response = yield call(UserService.sendEmail, data);
      console.log("getCheckCode", response);
    },
    *register({ payload: data }, { call, put }) {
      const response = yield call(UserService.register, data);
      console.log("register", response);
    },
    *logout({ payload }, { call, put }) {
      const response = yield call(UserService.logout);
      console.log("logout", response);
      // 清空用户信息
      yield put({
        type: 'saveUserLoginInfo',
        payload: {
          user: '',
        },
      });
      // if (response.data.code === HttpMessage.result.SUCCESS) {
      //   message.success(response.data.message);
      //   // 清空用户信息
      //   yield put({
      //     type: 'saveUserLoginInfo',
      //     payload: {
      //       userInfo: '',
      //     },
      //   });
      //   yield put(routerRedux.push('/'));
      // }
    },
  },

  reducers: {
    saveUserLoginInfo(state, {payload: {user}}) {
      return {...state, user};
    },
    saveLoginModalVisible(state, {payload: {loginModalVisible}}) {
      return {...state, loginModalVisible};
    },
  },

};
