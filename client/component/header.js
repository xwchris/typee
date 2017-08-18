import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className="component-header">
        <ul>
          <li><Link to="/">首页</Link></li>
          <li><Link to="/lessons">课程</Link></li>
          <li><Link to="/lesson-detail">课程详情页</Link></li>
        </ul>
      </div>
    );
  }
}

export default Header;