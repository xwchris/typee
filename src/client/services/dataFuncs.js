import fetch from 'isomorphic-fetch';

// 获取文本
function getJSON(url) {
  return fetch(url).then(response => (response.json())).catch((error) => {
    console.error(error);
  });
}

const getData = async function getText({ url = '', callback }) {
  // 获取数据
  const data = await getJSON(url);
  // 回调
  callback(data);
  return data;
};

export default getData;
