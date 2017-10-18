import getData from 'services/dataFuncs';
import showLoginOrRegistPopup from 'services/loginService';
import config from 'config';
import { createTip } from 'mixin';

export default function updateService(props, value) {
  const url = `${config.api}/account/update`;

  const callback = (data) => {
    // 请求错误
    if (data.status === 1) {
      createTip(data.error_message, 'error');
    } else {
      createTip('更新成功!');
    }
  };

  getData({
    url,
    method: 'POST',
    value,
    callback,
  });
}
