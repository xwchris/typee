import { message } from 'mixins';
import getData from 'services/dataFuncs';
import config from 'config';

export default (props) => {
  const { dispatch } = props;

  const callback = (data) => {
    // 请求错误
    if (data.status === 1) {
      message.error(data.error_message);
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
