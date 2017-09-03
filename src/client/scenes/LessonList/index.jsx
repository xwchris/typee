import React from 'react';

const LessonList = () => (
  <div className="lesson-list-container">
    <h1 className="lesson-list-title">课程列表</h1>
    <div className="lesson-list-content clearfix">
      {
        new Array(9).fill(0).map(() => (
          <div className="btn lesson-card pull-left">
            Python
          </div>
        ))
      }
    </div>
  </div>
);

export default LessonList;
