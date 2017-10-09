import { getData } from 'services/dataFuncs';
import { isIntNumber } from '../mixins/helpers';
import config from 'config';

export default function getLessonDetail(props) {
  // fileId 和 pageId
  const { fileId, pageId = 0 } = props.match.params;
  // 这里有问题  服务器和客户端都请求了一次
  if (!isIntNumber(pageId)) {
    return;
  }
  const dispatch = props.dispatch;
  getData({
    url: `${config.api}/file?file_id=${fileId}&page_id=${pageId}`,
    key: 'lessonList',
    props,
    callback: (data) => {
      // 请求错误
      if (data.status === 1) {
        window.createTip(data.error_message, 'error');
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
    },
  });
}
