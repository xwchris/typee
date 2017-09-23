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
    return (
      <div className="lesson-list-container">
        <div className="lesson-list-content container">
          <div className="content-list clearfix">
            {
              lessonList.map(item => (
                <Link className="btn content-item pull-left" key={item.id} to={`/lesson-detail/${item.file_id}/0`}>
                  <div className="item-title">{item.name}</div>
                  <div className="item-desc">这是一门简单灵活的语言</div>
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
