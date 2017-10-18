import React from 'react';
import Header from '../../components/Header';

export default () => (
  <div className="admin-home-container">
    <Header />
    <div className="container-box clearfix">
      <ul className="section-nav pull-left">
        <li className="nav-title">管理列表</li>
        <li className="white-btn nav-item">课程管理</li>
        <li className="white-btn nav-item">用户管理</li>
        <li className="white-btn nav-item">日志管理</li>
        <li className="white-btn nav-item">接口管理</li>
      </ul>
      <div className="section-content">
        <h2 className="section-title">课程管理</h2>
      </div>
    </div>
  </div>
);
