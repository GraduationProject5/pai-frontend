import request from '../utils/request';

const EXPERIMENT_API = '/api/experiment/';

/**
 * 创建实验
 * @param data
 * @returns {*}
 */
export function create(data) {
  return request(`${EXPERIMENT_API}create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

/**
 * 获得所有实验
 * @param data
 * @returns {*}
 */
export function allExperiment(data) {
  return request(`${EXPERIMENT_API}allExperiment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

/**
 * 获取实验详情
 * @param data
 */
export function getExperimentDetail(data) {

}
