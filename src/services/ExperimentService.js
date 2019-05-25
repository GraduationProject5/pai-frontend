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
    credentials: 'include',
  });
}

/**
 * 根据模板创建实验
 * @param data
 * @returns {*}
 */
export function createTextAnalysisExperiment(data, token) {
  return request(`${EXPERIMENT_API}createTextAnalysisExperiment?experimentName=${data.name}&description=${data.description}`, {
    method: 'POST',
    headers: {
      token: token
    },
    credentials: 'include',
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
    credentials: 'include',
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
    credentials: 'include',
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
    credentials: 'include',
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
    credentials: 'include',
  });
}


/**
 * 运行实验 文本分析
 */
export function run(data, token) {
  return request(`${EXPERIMENT_API}executeTextAnalysis?tableName=${data.tableName}&target=${data.target}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token
    },
    body: JSON.stringify(data.requestBody),
    credentials: 'include',
  });
}

/**
 * 运行实验 图片训练
 */
export function executePicTrain(data, token) {
  return request(`${EXPERIMENT_API}executePicTrain`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });
}
