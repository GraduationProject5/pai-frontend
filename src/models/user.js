import {message} from 'antd';
import * as UserService from '../services/UserService';
import {routerRedux} from 'dva/router';
import {USER_MESSAGE} from '../services/Message';

export default {

  namespace: 'user',

  state: {
    userInfo: '',
    loginModalVisible: false,
    code: '', // 验证码
  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
      return history.listen(({pathname, query}) => {
        if (pathname === '/experiment' || pathname === '/') {
          dispatch({
            type: 'initUserInfo',
            payload: {
              pathname
            }
          });
        }
      });
    },
  },

  effects: {
    * login({payload: user}, {call, put}) {
      const response = yield call(UserService.login, user);
      console.log('login', response);
      // 关闭登录弹出框
      if (response && response.result) {
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
            userInfo: response,
          },
        });
        const sessionStorage = window.sessionStorage;
        sessionStorage.setItem('token', response.token);
      } else if (response.message) {
        message.error(USER_MESSAGE[response.message] || response.message);
      } else {
        message.error('登录失败');
      }
    },
    * initUserInfo({payload: {pathname}}, {call, put}) {
      const sessionStorage = window.sessionStorage;
      const token = sessionStorage.getItem('token');
      if (token) {
        // 保存用户信息
        yield put({
          type: 'saveUserLoginInfo',
          payload: {
            userInfo: {
              token: token
            },
          },
        });
      } else {
        if (pathname === '/experiment') {
          yield put({
            type: 'saveLoginModalVisible',
            payload: {
              loginModalVisible: true,
            },
          });
        }
      }
    },
    * getCheckCode({payload: data}, {call, put}) {
      const response = yield call(UserService.sendToken, UserService.sendEmail, data);
      console.log("getCheckCode", response);
      if (response && response.result) {
        message.success('获取验证码成功，请到对应邮箱查收验证码');
        yield put({
          type: 'saveCode',
          payload: {
            code: response.code,
          },
        });
      } else if (!response.result) {
        message.error(USER_MESSAGE[response.code]);
      } else {
        message.error('获取验证码失败');
      }
    },
    * register({payload: data}, {call, put, select}) {
      const user = yield select(state => state.user);
      if (user.code === data.code) {
        const response = yield call(UserService.register, data);
        console.log("register", response);
        if (response && response.result) {
          message.success('注册成功');
        } else if (!response.result) {
          message.error(USER_MESSAGE[response.code]);
        } else {
          message.error('注册失败');
        }
      } else {
        message.error('验证码错误');
      }
    },
    * logout({payload}, {call, put}) {
      yield call(UserService.sendToken, UserService.logout);
      // 清空用户信息
      yield put({
        type: 'saveUserLoginInfo',
        payload: {
          userInfo: '',
        },
      });
      const sessionStorage = window.sessionStorage;
      sessionStorage.setItem('token', '');
      yield put(routerRedux.push('/'));
    },
  },

  reducers: {
    saveUserLoginInfo(state, {payload: {userInfo}}) {
      return {...state, userInfo};
    },
    saveCode(state, {payload: {code}}) {
      return {...state, code};
    },
    saveLoginModalVisible(state, {payload: {loginModalVisible}}) {
      return {...state, loginModalVisible};
    },
  },

};
