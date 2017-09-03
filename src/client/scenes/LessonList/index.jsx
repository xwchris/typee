import React from 'react';
import { Link } from 'react-router-dom';

const LessonList = () => (
  <div className="lesson-list-container">
    <h1 className="lesson-list-title">课程列表</h1>
    <div className="lesson-list-content clearfix">
      {
        new Array(9).fill(0).map((item, index) => (
          <Link className="btn lesson-card pull-left" to={`/lesson-detail/${index}`} key={`lesson_${index + 1}`}>
            Python
          </Link>
        ))
      }
    </div>
  </div>
);

export default LessonList;
