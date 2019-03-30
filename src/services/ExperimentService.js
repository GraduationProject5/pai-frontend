import request from '../utils/request';

const EXPERIMENT_API = '/api/scenario/';

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
export function allExperiment(token) {
  return request(`${EXPERIMENT_API}allExperiment`, {
    headers: {
      token: token,
    },
  });
}

/**
 * 获取实验详情
 * @param data
 */
export function getExperimentDetail(data) {

}



/**
 * 运行实验
 */
export function run() {

}
