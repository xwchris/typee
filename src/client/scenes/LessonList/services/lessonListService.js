import getData from 'services/dataFuncs';
import config from 'config';

export default function getLessonList(props) {
  const dispatch = props.dispatch;

  getData({
    url: config.api,
    callback: (data) => {
      // 请求错误
      if (data.status === 1) {
        window.createTip(data.error_message, 'error');
      } else {
        dispatch({
          type: 'LESSON_LIST',
          key: 'lessonList',
          value: data.lesson_list,
        });
      }
    },
  });
}
