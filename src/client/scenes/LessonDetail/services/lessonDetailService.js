import getData from 'services/dataFuncs';

export default function getLessonDetail(props) {
  // fileId 和 pageId
  const { fileId, pageId } = props.match.params;
  const dispatch = props.dispatch;
  getData({
    url: `http://api.ustudents.cn/file?file_id=${fileId}&page_id=${pageId}`,
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
