import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <div className="component-header">
    <div className="container">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink className="btn item-btn" exact activeClassName="active" to="/">首页</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="btn item-btn" activeClassName="active" to="/lesson-list">课程</NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="btn item-btn"
            activeClassName="active"
            to="/lesson-detail"
          >
            课程详情页
          </NavLink>
        </li>
        <li className="nav-item pull-right">
          <NavLink
            className="btn item-btn"
            activeClassName="active"
            to="/problem-feedback"
          >
            反馈问题
          </NavLink>
        </li>
      </ul>
    </div>
  </div>
);

export default Header;
