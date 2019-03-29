import {message} from 'antd';
import * as ComponentMock from '../Mock/ComponentMock';
import * as ArrayUtil from '../utils/arrayUtil';
import * as ComponentService from "../services/ComponentService";
import {sendToken} from "../services/UserService";

export default {

  namespace: 'component',

  state: {
    result: {},         // 单个组件实验结果
    nodes: [],          // 场景中的组件节点
    edges: [],          // 场景中的边
    dataSetList: [],    // 所有组件结果
    paramsList: [],     // 所有组件实验结果表示参数
    resultsList: [],    // 所有组件实验结果
  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
    },
  },

  effects: {
    * fetch({payload}, {call, put}) {  // eslint-disable-line
      yield put({type: 'save'});
    },
    * getResult({payload: data}, {call, put, select}) {  // eslint-disable-line
      // const experiment = yield select(state => state.experiment);
      // const experimentId = experiment.experimentDetail.id;
      // const result = ArrayUtil.find(ComponentMock.result.results, 'id', data.nodeId);
      // yield put({
      //   type: 'saveResult',
      //   payload: {
      //     result: result
      //   }
      // });
      const response = yield call(sendToken, ComponentService.getDataSet, data);
      console.log('getResult', response);
      if (response && response.result) {
        message.success('获取组件结果成功');
      } else {
        message.error('获取组件结果失败');
      }
    },
    * pushScenario({payload: data}, {call, put, select}) {  // eslint-disable-line
      // const experiment = yield select(state => state.experiment);
      // const experimentId = experiment.experimentDetail.id;
      const response = yield call(sendToken, ComponentService.save, data);
      console.log('pushScenario', response);
      if (response && response.result) {
        message.success('保存实验场景成功');
      } else {
        message.error('保存实验场景失败');
      }
    },
    * getScenario({payload: {experimentId}}, {call, put, select}) {  // eslint-disable-line
      // const experiment = yield select(state => state.experiment);
      // const experimentId = experiment.experimentDetail.id;
      const response = yield call(sendToken, ComponentService.getScenario, experimentId);
      console.log('getScenario', response);
      if (response && response.result) {
        yield put({
          type: 'saveScenario',
          payload: {
            nodes: [],
            edges: [],
            dataSetList: [],
            paramsList: [],
            resultsList: [],
          }
        });
      } else {
        message.error('获取实验场景失败');
      }
    },
    * saveSettingsForNode({payload: data}, {call, put, select}) {  // eslint-disable-line
      // const experiment = yield select(state => state.experiment);
      // const experimentId = experiment.experimentDetail.id;
      const response = yield call(ComponentService.saveSettingsForNode, data);
      console.log('saveSettingsForNode', response);
    },
  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
    saveResult(state, {payload: {result}}) {
      return {...state, result}
    },
    saveScenario(state, {payload}) {
      return {...state, ...payload}
    },
  },

};
