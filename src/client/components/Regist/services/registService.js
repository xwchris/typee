import getData from 'services/dataFuncs';
import showLoginOrRegistPopup from 'services/loginService';
import config from 'config';
import { message } from 'mixins';

export default (props, value) => {
  const { dispatch } = props;
  const url = `${config.api}/account/register`;

  const callback = (data) => {
    // 请求错误
    if (data.status === 1) {
      message.error(data.error_message);
    } else {
      message.success('注册成功!');
      dispatch({
        type: 'IS_LOGGEDIN',
        key: 'isLoggedin',
        value: true,
      });
      dispatch({
        type: 'USER_INFO',
        key: 'userInfo',
        value: data.show,
      });
      // 关闭登录框
      showLoginOrRegistPopup(dispatch, 'showRegistPopup', false);
    }
  };

  getData({
    url,
    method: 'POST',
    value,
    callback,
  });
};
