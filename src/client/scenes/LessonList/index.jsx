import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import getData from './services/lessonListService';

class LessonList extends Component {
  componentWillMount() {
    // 请求数据
    getData(this.props);
  }

  render() {
    // 课程列表
    const { lessonList = [] } = this.props;
    // 取出所有文件列表
    const list = lessonList.map((item) => {
      const cell = item.file_ids.map((fileId, index) => ({ fileId, name: item.name, index: index + 1, desc: '这是一门方便灵活的程序语言' }));
      return cell;
    });
    // 扁平化数组
    let cellList = [];
    list.forEach((item) => {
      cellList = cellList.concat(item);
    });
    return (
      <div className="lesson-list-container">
        <div className="lesson-list-content container">
          <div className="content-list clearfix">
            {
              cellList.map(item => (
                <Link className="btn content-item pull-left" key={item.fileId} to={`/lesson-detail/${item.fileId}/0`}>
                  <div className="item-title">{`${item.name}-${item.index}`}</div>
                  <div className="item-desc">{item.desc}</div>
                </Link>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    lessonList: state.lessonList,
  }),
)(LessonList);
