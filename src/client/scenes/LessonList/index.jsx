import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import getData from 'services/dataFuncs';

class LessonList extends Component {
  componentWillMount() {
    getData({
      url: 'http://api.ustudents.cn',
      callback: (data) => {
        this.props.dispatch({
          type: 'LESSON_LIST',
          key: 'lessonList',
          value: data.lesson_list,
        });
      },
    });
  }

  render() {
    // 课程列表
    const { lessonList = [] } = this.props;
    return (
      <div className="lesson-list-container">
        <div className="lesson-list-content container">
          <h1 className="content-title">课程列表</h1>
          <div className="content-list clearfix">
            {
              lessonList.map(item => (
                <Link className="btn content-item pull-left" key={item.id} to={`/lesson-detail/${item.file_ids[0]}`}>
                  <div className="item-title">{item.name}</div>
                  <div className="item-desc">这是一门方便灵活的程序语言</div>
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
