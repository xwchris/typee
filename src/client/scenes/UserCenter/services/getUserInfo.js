import getData from 'services/dataFuncs';
import config from 'config';
import { createTip } from 'mixin';

export default (props) => {
  const { dispatch } = props;

  const callback = (data) => {
    // 请求错误
    if (data.status === 1) {
      createTip(data.error_message, 'error');
    } else {
      dispatch({
        type: 'USER_INFO',
        key: 'userInfo',
        value: data.show,
      });
    }
  };

  getData({
    url: `${config.api}/account/show`,
    dispatch,
    callback,
  });
};
