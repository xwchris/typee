import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = () => (
  <div className="component-header">
    <div className="container clearfix">
      <Link className="btn logo-box pull-left" to="/">Typee</Link>
      <div className="nav-list pull-right">
        <NavLink className="btn nav-item" exact activeClassName="active" to="/">首页</NavLink>
        <NavLink className="btn nav-item" activeClassName="active" to="/lesson-list">课程</NavLink>
        <NavLink className="btn nav-item" activeClassName="active" to="/problem-feedback">
          反馈问题
        </NavLink>
      </div>
    </div>
  </div>
);

export default Header;
