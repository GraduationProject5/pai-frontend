import request from '../utils/request';

const SCENARIO_API = '/api/scenario/';

/**
 * 获取实验各个组件结果
 * @param data
 * @param token
 * @returns {*}
 */
export function getDataSet(data, token) {
  return request(`${SCENARIO_API}getDataSet?experimentID=${data.experimentId}&nodeNo=${data.nodeNo}`, {
    headers: {
      'token': token
    },
    credentials: 'include',
  });
}


/**
 *
 * 保存组件参数
 * @param data
 * @param token
 * @returns {*}
 */
export function saveSettingsForNode(data, token) {
  return request(`${SCENARIO_API}saveSettingsForNode`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });
}

/**
 * 获取所有组件
 */
export function getComponents() {
  return request(`${SCENARIO_API}getSectionsAndComponents`);
}

/**
 * 获取图片训练结果
 */
export function getPicTrainResult(data, token) {
  return request(`${SCENARIO_API}getPicTrainResult?taskID=${data.taskID}&nodeNo=${data.nodeNo}&experimentID=${data.experimentId}`,
    {
      headers: {
        'token': token
      },
      credentials: 'include',
    });
}

