import * as DataService from "../services/DataService";
import {checkTokenVaild, sendToken} from '../services/UserService';
import * as DataMock from '../Mock/DataMock';


export default {

  namespace: 'data',

  state: {
    dataTables: [],
    tableDetail: {},  // 表的字段
    tableData: [],    // 表的数据
  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
    },
  },

  effects: {
    * fetch({payload}, {call, put}) {  // eslint-disable-line
      yield put({type: 'save'});
    },
    * createTableByColumn({payload: data}, {call, put}) {  // eslint-disable-line
      if (checkTokenVaild()) {
        const response = yield call(sendToken, DataService.createTableByColumn, data);
        console.log('createTableByColumn', response);
      } else {
        yield put({
          type: 'user/saveLoginModalVisible',
          payload: {
            loginModalVisible: true,
          },
        });
      }
    },
    * createTableByScript({payload: data}, {call, put}) {  // eslint-disable-line
      const response = yield call(DataService.createTableByScript, data);
      console.log('createTableByScript', response);
    },
    * uploadData({payload: data}, {call, put}) {  // eslint-disable-line
      const response = yield call(DataService.uploadData, data);
      console.log('uploadData', response);
    },
    * getAllTable({payload}, {call, put}) {  // eslint-disable-line
      if (checkTokenVaild()) {
        // const response = yield call(DataService.allTable, data);
        // console.log('getAllTable', response);
        const response = yield call(sendToken, DataService.allTable);
        console.log('getAllTable', response);
        yield put({
          type: 'saveDataTables',
          payload: {
            dataTables: response.tables
          }
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
    * getTableDetail({payload: {tableName}}, {call, put}) {  // eslint-disable-line
      const response = yield call(sendToken, DataService.tableDetail, tableName);
      console.log('getTableDetail', response);
      yield put({
        type: 'saveTableDetail',
        payload: {
          tableDetail: response,
        },
      });
    },
    * getTableData({payload: {tableName}}, {call, put}) {  // eslint-disable-line
      const response = yield call(sendToken, DataService.tableData, tableName);
      console.log('getTableData', response);
      yield put({
        type: 'saveTableData',
        payload: {
          tableData: response,
        },
      });
    },
  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
    saveDataTables(state, {payload: {dataTables}}) {
      return {...state, dataTables}
    },
    saveTableDetail(state, {payload: {tableDetail}}) {
      return {...state, tableDetail}
    },
    saveTableData(state, {payload: {tableData}}) {
      return {...state, tableData}
    },
  },

};
