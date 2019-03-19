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
 * 查看实验
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
