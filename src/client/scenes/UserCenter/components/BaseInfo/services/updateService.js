import { message } from 'antd';
import getData from 'services/dataFuncs';
import showLoginOrRegistPopup from 'services/loginService';
import config from 'config';

export default function updateService(props, value) {
  const url = `${config.api}/account/update`;

  const callback = (data) => {
    // 请求错误
    if (data.status === 1) {
      message.error(data.error_message);
    } else {
      message.success('更新成功!');
    }
  };

  getData({
    url,
    method: 'POST',
    value,
    callback,
  });
}
