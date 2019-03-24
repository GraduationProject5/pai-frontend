import * as ComponentService from "../services/ComponentService";
import * as ComponentMock from '../Mock/ComponentMock';

export default {

  namespace: 'component',

  state: {
    components: [],     // 组件列表
  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
    },
  },

  effects: {
    * fetch({payload}, {call, put}) {  // eslint-disable-line
      yield put({type: 'save'});
    },
    * getComponents({payload: data}, {call, put}) {  // eslint-disable-line
      // const response = yield call(ExperimentService.allExperiment, data);
      console.log('getComponents',  ComponentMock.components);
      yield put({
        type: 'saveComponents',
        payload: {
          components: ComponentMock.components
        }
      });
    },
  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
    saveComponents(state, {payload: {components}}) {
      return {...state, components}
    },
  },

};
