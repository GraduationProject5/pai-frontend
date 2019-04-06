import * as DataService from "../services/DataService";
import {checkTokenVaild, sendToken} from '../services/UserService';

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
    * getAllTable({payload}, {call, put}) {  // eslint-disable-line
      if (checkTokenVaild()) {
        const response = yield call(sendToken, DataService.allTable);
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
      yield put({
        type: 'saveTableData',
        payload: {
          tableData: response.list || [],
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
