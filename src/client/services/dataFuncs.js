import fetch from 'isomorphic-fetch';
import cookieParser from 'cookie-parser';

export default ({ url = '', method = 'GET', callback = () => {}, value = {}, cookies = '' }) => {
  // 请求头
  const headers = new Headers();
  headers.append('Content-Type', 'application/json;charset=UTF-8');

  let requestConfig = {};
  // get请求
  if (method === 'GET') {
    // 如果是服务端渲染
    if (!global.document) {
      let cookie = cookieParser.JSONCookies(cookies);
      cookie = `account_id="${cookie.account_id}"`;
      console.info('cookie', cookie);
      headers.append('Cookie', cookie);
    }
    requestConfig = {
      method,
      credentials: 'include',
      headers,
    };
  }

  // post请求
  if (method === 'POST') {
    requestConfig = {
      method,
      mode: 'cors',
      body: JSON.stringify(value),
      credentials: 'include',
      headers,
    };
  }

  // 创建request对象
  const request = new Request(url, requestConfig);
  fetch(request)
    .then(response => response.json())
    .then(response => callback(response))
    .catch((error) => {
      console.error(error);
      // 返回空对象
      return {};
    });
};
