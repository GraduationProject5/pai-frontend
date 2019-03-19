import * as ExperimentService from "../services/ExperimentService";

export default {

  namespace: 'experiment',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *create({ payload: data }, { call, put }) {  // eslint-disable-line
      const response = yield call(ExperimentService.create, data);
      console.log('create', response);
    },
    *getAllExperiment({ payload: data }, { call, put }) {  // eslint-disable-line
      const response = yield call(ExperimentService.allExperiment, data);
      console.log('getAllExperiment', response);
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
