import request from '../utils/request';

const DATA_API = '/api/data/';

/**
 * 用户建表 （通过表格填写列属性）
 * @param data
 * @returns {*}
 */
export function createTableByColumn(data) {
  return request(`${DATA_API}createTableByColumn`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

/**
 * 用户建表 （通过MySql脚本）
 * @param data
 * @returns {*}
 */
export function createTableByScript(data) {
  return request(`${DATA_API}createTableByScript`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

/**
 * 用户导入数据到自建表中
 * @param data
 * @returns {*}
 */
export function uploadData(data) {
  return request(`${DATA_API}importData`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

/**
 * 查看用户自建表列表
 * @returns {*}
 */
export function allTable() {
  return request(`${DATA_API}allTable`, {
    credentials: 'include',
  });
}

/**
 * 查看某张表的属性（有哪些列）
 * @returns {*}
 */
export function tableDetail() {
  return request(`${DATA_API}tableDetail`, {
    credentials: 'include',
  });
}





