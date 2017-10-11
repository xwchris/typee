import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popup from '../Popup';
import loginService from './services/loginService';

class Login extends Component {
  // 登录
  login() {
    loginService(this.props.dispatch, {
      login_card: this.username.value.trim(),
      password: this.password.value.trim(),
    });
  }

  // 渲染
  render() {
    return (
      <Popup showPopup={this.props.showLoginPopup} popupKey="showLoginPopup">
        <div className="component-login">
          <div className="login-title">登录Typee</div>
          <div className="login-content">
            <div className="inner-box">
              <input
                type="text"
                ref={(ele) => { this.username = ele; }}
                className="login-input username"
                placeholder="用户名/邮箱"
              />
              <input
                type="password"
                ref={(ele) => { this.password = ele; }}
                className="login-input password"
                placeholder="密码"
              />
              <div
                className="blue-btn"
                role="button"
                onClick={() => this.login()}
              >
              登录
              </div>
              <span className="forget-password btn">忘记密码？</span>
            </div>
          </div>
        </div>
      </Popup>
    );
  }
}

export default connect(
  state => ({
    showLoginPopup: state.showLoginPopup,
  }),
)(Login);
