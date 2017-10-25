import React, { Component } from 'react';
import { Menu, Row, Col, Dropdown, Icon } from 'antd';
import { connect } from 'react-redux';
import { cookie } from 'mixins';
import { Link, withRouter } from 'react-router-dom';
import showLoginOrRegistPopup from 'services/loginService';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 'lesson-list',
    };
  }

  componentDidMount() {
    const current = this.props.location && this.props.location.pathname.split('/')[1];
    if (current !== this.state.current) {
      this.setState({
        current: current === '' ? 'lesson-list' : current,
      });
    }
  }

  handleLogout() {
    const { dispatch } = this.props;
    dispatch({
      type: 'IS_LOGGEDIN',
      key: 'isLoggedin',
      value: false,
    });
    dispatch({
      type: 'USER_INFO',
      key: 'userInfo',
      value: '',
    });
    // 删除cookie
    cookie.delete('account_id');
  }

  handleClick(e) {
    this.setState({
      current: e.key,
    });
  }

  render() {
    const { dispatch, isLoggedin, userInfo = '' } = this.props;

    const userMenu = (
      <Menu>
        <Menu.Item style={{ padding: '5px 15px' }}>
          <Link to="user-center"><Icon type="user" style={{ marginRight: '5px' }} />个人中心</Link>
        </Menu.Item>
        <Menu.Item style={{ padding: '5px 15px' }}>
          <span role="button" onClick={() => this.handleLogout()}><Icon type="poweroff" style={{ marginRight: '5px' }} />注销</span>
        </Menu.Item>
      </Menu>
    );

    return (
      <header className="component-header">
        <Row>
          <Col md={4} lg={3}>
            <a className="logo">Typee</a>
          </Col>
          <Col md={17} lg={19}>
            <Menu
              className="nav"
              theme="light"
              mode="horizontal"
              onClick={e => this.handleClick(e)}
              selectedKeys={[this.state.current]}
            >
              <Menu.Item key="lesson-list" >
                <Link to="/">课程列表</Link>
              </Menu.Item>
              <Menu.Item key="other">
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
                <Dropdown overlay={userMenu}>
                  <span className="btn user-dropdown">
                    Hi, {userInfo.name || ''}<Icon type="down" />
                  </span>
                </Dropdown>
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
