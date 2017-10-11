import { sendRequest } from 'services/dataFuncs';
import showLoginOrRegistPopup from 'services/loginService';
import config from 'config';

export default function registService(dispatch, value) {
  const url = `${config.api}/account/register`;
  sendRequest({
    url,
    method: 'POST',
    value,
    callback: (data) => {
      // 请求错误
      if (data.status === 1) {
        window.createTip(data.error_message, 'error');
      } else {
        window.createTip('注册成功!');
        dispatch({
          type: 'IS_LOGGEDIN',
          key: 'isLoggedin',
          value: true,
        });
        dispatch({
          type: 'USER_INFO',
          key: 'username',
          value: data.name,
        });
        // 关闭登录框
        showLoginOrRegistPopup(dispatch, 'showRegistPopup', false);
      }
    },
  });
}
