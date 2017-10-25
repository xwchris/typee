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
        type: 'LESSON_LIST',
        key: 'lessonList',
        value: data.lesson_list,
      });
    }
  };

  if (props.lessonList) {
    return;
  }

  // 如果数据存在则直接返回
  if (props.lessonList) {
    callback(props.lessonList);
  } else {
    getData({
      url: `${config.api}/lesson/list`,
      key: 'lessonList',
      props,
      callback,
    });
  }
};
