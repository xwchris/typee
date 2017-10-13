import fetch from 'isomorphic-fetch';

// 获取文本
function getJSON(url) {
  return fetch(url, {
    method: 'GET',
    credentials: 'include',
  }).then(response => (response.json())).catch((error) => {
    console.error(error);
    // 返回空对象
    return {};
  });
}

// 获取数据
export const getData = async function getText({ url = '', key, props, callback }) {
  // 如果已有该数据则不请求
  if (props[key]) {
    return props[key];
  }
  // 如果没有则请求
  // 获取数据
  const data = await getJSON(url);
  // 回调
  callback(data);
  return data;
};

// 发送请求
export const sendRequest = function sendRequest({ method = 'GET', value = {}, url = '', callback = () => {} }) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json;charset=UTF-8');

  const request = new Request(url, {
    method,
    mode: 'cors',
    body: JSON.stringify(value),
    credentials: 'include',
    headers,
  });
  fetch(request)
    .then(response => response.json())
    .then(response => callback(response))
    .catch((error) => {
      console.error(error);
      // 返回空对象
      return {};
    });
};
