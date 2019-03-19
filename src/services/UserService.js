import request from '../utils/request';

const USER_API = '/api/user/';

export function login(user) {
  return request(`${USER_API}login?email=${user.email}&password=${user.password}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

/**
 * 发送邮件(到指定邮箱获取验证码)
 * @param data
 * @returns {*}
 */
export function sendEmail(data) {
  return request(`${USER_API}sendEmail?email=${data.email}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function register(data) {
  return request(`${USER_API}register?email=${data.email}&code=${data.code}&password=${data.password}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function logout() {
  return request(`${USER_API}logout`);
}
