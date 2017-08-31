import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <div className="component-header">
    <div className="container">
      <ul className="nav-list">
        <li className="nav-item"><Link to="/">首页</Link></li>
        <li className="nav-item"><Link to="/lesson-list">课程</Link></li>
        <li className="nav-item"><Link to="/lesson-detail">课程详情页</Link></li>
      </ul>
    </div>
  </div>
);

export default Header;
