import { message } from 'mixins';
import config from 'config';
import getData from 'services/dataFuncs';
import { isIntNumber } from '../mixins/helpers';

export default (props) => {
  // fileId 和 pageId
  const { dispatch } = props;
  const { fileId, pageId = 0 } = props.match.params;
  // 这里有问题  服务器和客户端都请求了一次
  if (!isIntNumber(pageId)) {
    return;
  }

  // 回调函数
  const callback = (data) => {
    // 请求错误
    if (data.status === 1) {
      message.error(data.error_message);
    } else {
      dispatch({
        type: 'LESSON_DETAIL',
        key: 'lessonDetail',
        value: {
          textArr: data.file_msg.split('') || [],
          page: data.page_id || 0,
          totalPage: data.pages || 0,
        },
      });
    }
  };

  getData({
    url: `${config.api}/file?file_id=${fileId}&page_id=${pageId}`,
    callback,
  });
};
