import React from 'react';

const ProblemFeedback = () => (
  <div className="problem-feedback-container">
    <div className="problem-feedback-content container clearfix">
      <textarea className="text-content" placeholder="请输入您要反馈的问题" />
      <div className="blue-btn submit-btn pull-right">提交</div>
    </div>
  </div>
);

export default ProblemFeedback;
