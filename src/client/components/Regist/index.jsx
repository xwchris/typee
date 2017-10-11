import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popup from '../Popup';
import registService from './services/registService';

class Regist extends Component {
  // 注册函数
  regist() {
    // 如果验证没有通过则直接返回
    if (!this.validate()) {
      return;
    }
    // 要获取的三个值
    registService(this.props.dispatch, {
      name: this.form.username.value.trim(),
      email: this.form.email.value.trim(),
      password: this.form.password.value.trim(),
    });
  }

  // 验证注册数据
  validate() {
    const validateMap = {
      username: {
        value: this.form.username.value.trim(),
        errorMsg: '用户名不能为空',
        validMsg: '用户名格式不正确',
      },
      email: {
        value: this.form.email.value.trim(),
        errorMsg: '邮箱不能为空',
        validMsg: '邮箱格式不正确',
      },
      password: {
        value: this.form.password.value.trim(),
        errorMsg: '密码不能为空',
        validMsg: '密码格式不正确',
      },
      confirmPassword: {
        value: this.form.confirmPassword.value.trim(),
        errorMsg: '密码不能为空',
        validMsg: '两次密码不一致',
        valid: () => (this.value === validateMap.password.value),
      },
    };

    return Object.keys(validateMap).every((item) => {
      if (validateMap[item].value === '') {
        window.createTip(validateMap[item].errorMsg, 'error');
        return false;
      } else if (validateMap[item].valid && validateMap[item].valid()) {
        window.createTip(validateMap[item].validMsg, 'error');
        return false;
      }
      return true;
    });
  }

  // 渲染
  render() {
    return (
      <Popup showPopup={this.props.showRegistPopup} popupKey="showRegistPopup">
        <div className="component-regist">
          <div className="regist-title">快速注册</div>
          <form className="regist-content" ref={(ele) => { this.form = ele; }}>
            <div className="inner-box">
              <input type="text" name="username" className="username" placeholder="用户名" />
              <input type="text" name="email" className="email" placeholder="邮箱" />
              <input type="password" name="password" className="password" placeholder="密码" />
              <input
                type="password"
                name="confirmPassword"
                className="confirm-password"
                placeholder="确认密码"
              />
              <div
                className="blue-btn"
                role="button"
                onClick={() => this.regist()}
              >
                注册
              </div>
            </div>
          </form>
        </div>
      </Popup>
    );
  }
}

export default connect(
  state => ({
    showRegistPopup: state.showRegistPopup,
  }),
)(Regist);
