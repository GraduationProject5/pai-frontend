import request from '../utils/request';

const DATA_API = '/api/data/';

/**
 * 用户建表 （通过表格填写列属性）
 */
export function createTableByColumn(data, token) {
  return request(`${DATA_API}createTableByColumn?tableName=${data.tableName}&description=${data.description}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: token,
    },
    body: JSON.stringify(data.requestBody),
  });
}

/**
 * 用户建表 （通过MySql脚本）
 * @returns {*}
 */
export function createTableByScript(data, token) {
  return request(`${DATA_API}createTableByScript?tableName=${data.tableName}&sql=${data.sql}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: token,
    },
  });
}

/**
 * 用户导入数据到自建表中
 * @returns {*}
 */
export function uploadData(data, token) {
  const formdata = new window.FormData();
  formdata.append('file', data.file.originFileObj);
  return request(`${DATA_API}insertCsv?tableName=${data.tableName}`, {
    method: 'POST',
    headers: {
      token: token,
    },
    body: formdata,
  });
}

/**
 * 查看用户自建表列表
 * @returns {*}
 */
export function allTable(token) {
  return request(`${DATA_API}allTable`, {
    headers: {
      token: token,
    },
  });
}

/**
 * 查看某张表的属性（有哪些列）
 * @returns {*}
 */
export function tableDetail(tableName, token) {
  return request(`${DATA_API}tableDetail?tableName=${tableName}`, {
    headers: {
      token: token,
    },
  });
}

/**
 * 获取表的所有行记录
 * @param tableName
 * @param token
 * @returns {*}
 */
export function tableData(tableName, token) {
  return request(`${DATA_API}tableData?tableName=${tableName}`, {
    headers: {
      token: token,
    },
  });
}

export function dropTable(tableID, token) {
  return request(`${DATA_API}dropTable?tableID=${tableID}`, {
    headers: {
      token: token,
    },
  });
}





