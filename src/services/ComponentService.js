import request from '../utils/request';

const SCENARIO_API = '/api/scenario/';

/**
 * 获取实验各个组件结果
 * @param data
 * @param token
 * @returns {*}
 */
export function getDataSet(data, token) {
  return request(`${SCENARIO_API}getDataSet?experimentID=${data.experimentId}&nodeID=${data.nodeId}`, {
    headers: {
      'token': token
    }
  });
}



/**
 * 读取组件场景
 */
export function getScenario(experimentId, token) {
  return request(`${SCENARIO_API}getScenario?experimentID=${experimentId}`, {
    headers: {
      'token': token
    }
  });
}

/**
 * 保存组件场景
 */
export function save(data, token) {
  return request(`${SCENARIO_API}saveScenario?experimentID=${data.experimentId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token
    },
    body: JSON.stringify(data.requestBody),
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
  return request(`${SCENARIO_API}saveSettingsForNode?nodeID=${data.nodeId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token
    },
    body: JSON.stringify(data.settings),
  });
}

/**
 * 获取所有组件
 */
export function getComponents() {
  return request(`${SCENARIO_API}getSectionsAndComponents`);
}

