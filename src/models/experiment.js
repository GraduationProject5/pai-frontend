import * as ExperimentService from "../services/ExperimentService";
import * as ExperimentMock from '../Mock/ExperimentMock';
import * as RegisterNode from '../utils/registerNode';
import * as ComponentMock from "../Mock/ComponentMock";

export default {

  namespace: 'experiment',

  state: {
    experiments: [],     // 实验列表
    components: [],      // 实验组件
    experimentDetail: {} // 实验详情
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/experiment') {
          dispatch({ type: 'registerNode' });
        }
      });
    },
  },

  effects: {
    * fetch({payload}, {call, put}) {  // eslint-disable-line
      yield put({type: 'save'});
    },
    * create({payload: data}, {call, put}) {  // eslint-disable-line
      const response = yield call(ExperimentService.create, data);
      console.log('create', response);
    },
    * registerNode({payload: data}, {call, put, select}) {  // eslint-disable-line
      const experiment = yield select(state => state.experiment);
      if (experiment.components.length === 0) {
        console.log("注册节点");
        RegisterNode.registerComponents(ComponentMock.components);
        RegisterNode.registerDataTable();
        yield put({
          type: 'saveComponents',
          payload: {
            components: ComponentMock.components
          }
        });
      }
    },
    * getAllExperiment({payload: data}, {call, put}) {  // eslint-disable-line
      // const response = yield call(ExperimentService.allExperiment, data);
      // console.log('getAllExperiment', response);
      yield put({
        type: 'saveExperiments',
        payload: {
          experiments: ExperimentMock.experiments
        }
      });
      yield put({
        type: 'saveExperimentDetail',
        payload: {
          experimentDetail: ExperimentMock.experiments[0]
        }
      });
    },
    * getExperimentDetail({payload: data}, {call, put}) {  // eslint-disable-line
      // const response = yield call(ExperimentService.getExperimentDetail, data);
      // console.log('getExperimentDetail', response);
      yield put({
        type: 'saveExperimentDetail',
        payload: {
          experimentDetail: ExperimentMock.experiments[data.id - 1]
        }
      });
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
  },

};
