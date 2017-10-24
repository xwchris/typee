import React, { Component } from 'react';
import { Menu, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import showLoginOrRegistPopup from 'services/loginService';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { dispatch, isLoggedin, userInfo = '' } = this.props;

    return (
      <header className="component-header">
        <Row>
          <Col md={4} lg={3}>
            <Link className="logo" to="/">Typee</Link>
          </Col>
          <Col md={17} lg={19}>
            <Menu className="nav" theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
              <Menu.Item key="nav-1">
                <Link to="/" exact>课程列表</Link>
              </Menu.Item>
              <Menu.Item key="nav-2">
                <Link to="/other">其他页面</Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col md={3} lg={2}>
            {
              !isLoggedin ? (
                <div>
                  <span
                    className="btn login-btn"
                    role="button"
                    onClick={() => showLoginOrRegistPopup(dispatch, 'showLoginPopup', true)}
                  >
                    登录
                  </span>
                  <span
                    className="btn regist-btn"
                    role="button"
                    onClick={() => showLoginOrRegistPopup(dispatch, 'showRegistPopup', true)}
                  >
                    注册
                  </span>
                </div>
              ) : (
                <Link className="user-btn" to="/user-center">Hi, {userInfo.name || ''}</Link>
              )
            }
          </Col>
        </Row>
      </header>
    );
  }
}

export default withRouter(connect(
  state => ({
    isLoggedin: state.isLoggedin,
    userInfo: state.userInfo,
  }),
)(Header));
