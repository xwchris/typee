import fetch from 'isomorphic-fetch';

// 获取文本
function getJSON(url) {
  return fetch(url).then(response => (response.json())).catch((error) => {
    console.error(error);
    // 返回空对象
    return {};
  });
}

const getData = async function getText({ url = '', key, props, callback }) {
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

export default getData;
