import * as ComponentService from "../services/ComponentService";
import { message } from 'antd';
import {checkTokenVaild, sendToken} from "../services/UserService";

export default {

  namespace: 'component',

  state: {
    result: {},         // 单个组件实验结果
    task_id: ''
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
        if (response && response.results) {
          yield put({
            type: 'saveResult',
            payload: {
              result: response.results
            }
          });
        } else {
          yield put({
            type: 'saveResult',
            payload: {
              result: {}
            }
          });
        }
      } else {
        message.error('获取组件结果失败');
        yield put({
          type: 'user/saveLoginModalVisible',
          payload: {
            loginModalVisible: true,
          },
        });
      }
    },
    * getPicTrainResult({payload: data}, {call, put, select}) {  // eslint-disable-line
      if(checkTokenVaild()) {
        const experiment = yield select(state => state.experiment);
        const component = yield select(state => state.component);
        data.experimentId = experiment.experimentDetail.experimentID;
        data.taskID= component.task_id || 43;
        const response = yield call(sendToken, ComponentService.getPicTrainResult, data);
        console.log('getResult', response);
        if (response && response.results) {
          yield put({
            type: 'saveResult',
            payload: {
              result: response.results
            }
          });
        } else if (response && response.result) {
          message.info(response.result);
          yield put({
            type: 'saveResult',
            payload: {
              result: {}
            }
          });
        } else {
          yield put({
            type: 'saveResult',
            payload: {
              result: {}
            }
          });
        }
      } else {
        message.error('获取图片训练结果失败');
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
    saveTaskID(state, {payload: {task_id}}) {
      return {...state, task_id}
    },
  },

};
