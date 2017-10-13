import { getData } from 'services/dataFuncs';
import config from 'config';

export default (props) => {
  const { dispatch } = props;

  getData({
    url: `${config.api}/account/show`,
    key: 'userInfo',
    props,
    callback: (data) => {
      // 请求错误
      if (data.status === 1) {
        window.createTip(data.error_message, 'error');
      } else {
        dispatch({
          type: 'USER_INFO',
          key: 'userInfo',
          value: data,
        });
      }
    },
  });
};
