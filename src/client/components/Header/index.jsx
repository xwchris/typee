import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link, withRouter } from 'react-router-dom';
import showLoginOrRegistPopup from 'services/loginService';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  // 渲染
  render() {
    const { dispatch, isLoggedin, userInfo = '' } = this.props;

    return (
      <div className="component-header">
        <div className="container clearfix">
          <Link className="logo-box btn pull-left" to="/">Typee</Link>
          <div className="nav-box pull-left">
            <NavLink className="nav-item btn" exact activeClassName="active" to="/">首页</NavLink>
            <NavLink
              className="nav-item btn"
              activeClassName="active"
              to="/lesson-list"
            >
            课程
            </NavLink>
            <NavLink className="nav-item btn" activeClassName="active" to="/problem-feedback">
              反馈问题
            </NavLink>
          </div>
          {
            !isLoggedin ? (
              <div className="login-box pull-right">
                <span
                  className="login-btn btn"
                  role="button"
                  onClick={() => showLoginOrRegistPopup(dispatch, 'showLoginPopup', true)}
                >
                  登录
                </span>
                <span className="line-divide">|</span>
                <span
                  className="regist-btn btn"
                  role="button"
                  onClick={() => showLoginOrRegistPopup(dispatch, 'showRegistPopup', true)}
                >
                  注册
                </span>
              </div>
            ) : (
              <div className="login-box pull-right">
                <NavLink className="login-btn btn" to="/user-center">Hi, { userInfo.name || '' }</NavLink>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default withRouter(connect(
  state => ({
    isLoggedin: state.isLoggedin,
    userInfo: state.userInfo,
  }),
)(Header));
