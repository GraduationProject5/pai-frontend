import * as ComponentMock from '../Mock/ComponentMock';
import * as ArrayUtil from '../utils/arrayUtil';

export default {

  namespace: 'component',

  state: {
    result: {},         // 实验结果
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
      const result = ArrayUtil.find(ComponentMock.result.results, 'id', data.nodeId);
      yield put({
        type: 'saveResult',
        payload: {
          result: result
        }
      });
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
