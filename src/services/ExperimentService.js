import request from '../utils/request';

const EXPERIMENT_API = '/api/scenario/';

/**
 * 创建实验
 * @param data
 * @returns {*}
 */
export function create(data, token) {
  return request(`${EXPERIMENT_API}createExperiment?experimentName=${data.name}&description=${data.description}`, {
    method: 'POST',
    headers: {
      token: token
    },
  });
}


export function updateExperimentInfo(data, token) {
  return request(`${EXPERIMENT_API}updateExperimentInfo?experimentID=${data.experimentId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: token
    },
    body: JSON.stringify(data.requestBody),
  });
}

/**
 * 获得所有实验
 * @param data
 * @returns {*}
 */
export function allExperiment(token) {
  return request(`${EXPERIMENT_API}allExperiment`, {
    headers: {
      token: token,
    },
  });
}

/**
 * 获取实验详情
 */
export function getExperimentDetail(id, token) {
  return request(`${EXPERIMENT_API}getScenario?experimentID=${id}`, {
    headers: {
      token: token,
    },
  });
}

/**
 * 保存组件场景
 */
export function save(data, token) {
  return request(`${EXPERIMENT_API}saveScenario`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token
    },
    body: JSON.stringify(data),
  });
}


/**
 * 运行实验
 */
export function run() {

}
