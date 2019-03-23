import * as DataService from "../services/DataService";
import * as DataMock from '../Mock/DataMock';

export default {

  namespace: 'data',

  state: {
    dataTables: []
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *createTableByColumn({ payload: data }, { call, put }) {  // eslint-disable-line
      const response = yield call(DataService.createTableByColumn, data);
      console.log('createTableByColumn', response);
    },
    *createTableByScript({ payload: data }, { call, put }) {  // eslint-disable-line
      const response = yield call(DataService.createTableByScript, data);
      console.log('createTableByScript', response);
    },
    *uploadData({ payload: data }, { call, put }) {  // eslint-disable-line
      const response = yield call(DataService.uploadData, data);
      console.log('uploadData', response);
    },
    *getAllTable({ payload: data }, { call, put }) {  // eslint-disable-line
      // const response = yield call(DataService.allTable, data);
      // console.log('getAllTable', response);
      yield put({
        type: 'saveDataTables',
        payload: {
          dataTables: DataMock.dataTables
        }
      });
    },
    *getTableDetail({ payload: data }, { call, put }) {  // eslint-disable-line
      const response = yield call(DataService.tableDetail, data);
      console.log('getTableDetail', response);
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    saveDataTables(state, {payload: {dataTables}}) {
      return {...state, dataTables}
    },
  },

};
