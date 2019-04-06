import {message} from 'antd';
import * as ExperimentService from "../services/ExperimentService";
import { getComponents } from "../services/ComponentService";
import * as RegisterNode from '../utils/registerNode';
import {checkTokenVaild, sendToken} from "../services/UserService";
import {handleSettings, sleep} from "../utils/util";

export default {

  namespace: 'experiment',

  state: {
    experiments: [],      // 实验列表
    components: [],       // 实验组件
    experimentDetail: {}, // 实验详情
    isRunning: false,     // 是否正在运行
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/experiment') {
          dispatch({ type: 'registerNode' });
          dispatch({ type: 'getAllExperiment' });
        }
      });
    },
  },

  effects: {
    * registerNode({payload: data}, {call, put, select}) {  // eslint-disable-line
      const response = yield call(getComponents);
      console.log('registerNode', response);
      const experiment = yield select(state => state.experiment);
      if (experiment.components.length === 0) {
        RegisterNode.registerComponents(response);
        RegisterNode.registerDataTable();
        yield put({
          type: 'saveComponents',
          payload: {
            components: response || []
          }
        });
      }
    },
    * getAllExperiment({payload}, {call, put}) {  // eslint-disable-line
      const response = yield call(sendToken, ExperimentService.allExperiment);
      console.log('getAllExperiment', response);
      yield put({
        type: 'saveExperiments',
        payload: {
          experiments: response.experiments
        }
      });
      if (response.experiments) {
        if (response.experiments.length > 0) {
          yield put({
            type: 'getExperimentDetail',
            payload: {
              id: response.experiments[0].experimentID
            }
          });
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
    * getExperimentDetail({payload: {id}}, {call, put}) {  // eslint-disable-line
      if(checkTokenVaild()) {
        const response = yield call(sendToken, ExperimentService.getExperimentDetail, id);
        console.log('getExperimentDetail', response);
        if (response && response.experimentID)  {
          handleSettings(response.nodes);
          yield put({
            type: 'saveExperimentDetail',
            payload: {
              experimentDetail: response
            }
          });
        } else {
          message.error("获取实验详情失败");
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
    * runExperiment({payload: {id}}, {call, put}) {  // eslint-disable-line
      if(checkTokenVaild()) {
        yield put({
          type: 'saveRunning',
          payload: {
            isRunning: true,
          },
        });
        const response = yield call(sendToken, ExperimentService.allExperiment);
        if (response && response.experimentID)  {
          message.success("运行实验成功");
        } else {
          message.error("运行实验失败");
        }
        yield put({
          type: 'saveRunning',
          payload: {
            isRunning: false,
          },
        });
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
    saveExperiments(state, {payload: {experiments}}) {
      return {...state, experiments}
    },
    saveExperimentDetail(state, {payload: {experimentDetail}}) {
      return {...state, experimentDetail}
    },
    saveComponents(state, {payload: {components}}) {
      return {...state, components}
    },
    saveRunning(state, {payload: {isRunning}}) {
      return {...state, isRunning}
    },
  },

};
