import { sendRequest } from 'services/dataFuncs';
import config from 'config';

export default function loginService(dispatch, value) {
  const url = `${config.api}/account/login`;
  sendRequest({
    url,
    method: 'POST',
    value,
    callback: (data) => {
      // 请求错误
      if (data.status === 1) {
        window.createTip(data.error_message, 'error');
      } else {
        window.createTip('登录成功!');
        dispatch({
          type: 'IS_LOGGEDIN',
          key: 'isLoggedin',
          value: true,
        });
      }
    },
  });
}
