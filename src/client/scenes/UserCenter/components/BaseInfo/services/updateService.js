import { sendRequest } from 'services/dataFuncs';
import showLoginOrRegistPopup from 'services/loginService';
import config from 'config';

export default function updateService(dispatch, value) {
  const url = `${config.api}/account/update`;
  sendRequest({
    url,
    method: 'POST',
    value,
    callback: (data) => {
      // 请求错误
      if (data.status === 1) {
        window.createTip(data.error_message, 'error');
      } else {
        window.createTip('更新成功!');
      }
    },
  });
}
