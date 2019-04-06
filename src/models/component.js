import * as ComponentService from "../services/ComponentService";
import { message } from 'antd';
import {checkTokenVaild, sendToken} from "../services/UserService";

export default {

  namespace: 'component',

  state: {
    result: {},         // 单个组件实验结果
  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
    },
  },

  effects: {
    * getResult({payload: data}, {call, put, select}) {  // eslint-disable-line

      if(checkTokenVaild()) {
        const experiment = yield select(state => state.experiment);
        data.experimentId = experiment.experimentDetail.experimentID;
        const response = yield call(sendToken, ComponentService.getDataSet, data);
        console.log('getResult', response);
        if (response && response.results) {
          yield put({
            type: 'saveResult',
            payload: {
              result: response.results
            }
          });
        } else {
          message.error('获取组件结果失败');
        }
      } else {
        yield put({
          type: 'user/saveLoginModalVisible',
          payload: {
            loginModalVisible: true,
          },
        });
      }
    },
  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
    saveResult(state, {payload: {result}}) {
      return {...state, result}
    },
  },

};
