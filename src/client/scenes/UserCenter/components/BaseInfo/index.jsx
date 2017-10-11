import React, { Component } from 'react';
import { connect } from 'react-redux';
import updateService from './services/updateService';

class BaseInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPwd: false,
    };
  }

  // 修改密码按钮事件
  changePwd() {
    this.setState({
      showPwd: true,
    });
  }

  // 提交信息
  submitData() {
    // 如果验证没有通过则直接返回
    if (!this.validate()) {
      return;
    }
    // 要获取的三个值
    updateService(this.props.dispatch, {
      name: this.form.username.value.trim(),
      email: this.form.email.value.trim(),
      old_password: this.form.oldPassword.value.trim(),
      new_password: this.form.password.value.trim(),
    });
  }

  // 验证更新数据
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
      oldPassword: {
        value: this.form.oldPassword.value.trim(),
        errorMsg: '密码不能为空',
        validMsg: '密码格式不正确',
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

  render() {
    return (
      <div className="component-user-center-base-info clearfix">
        <div className="section-right pull-right">
          <div className="btn user-avater">
            <img className="image-src" src="/static/images/default-avatar.png" alt="用户头像" />
          </div>
        </div>
        <div className="section-left">
          <form className="user-info" ref={(ele) => { this.form = ele; }}>
            <div className="info-item">
              <span className="info-title">用户名：</span>
              <input className="info-input" name="username" type="text" />
            </div>
            <div className="info-item">
              <span className="info-title">邮箱：</span>
              <input className="info-input" name="email" type="text" />
            </div>
            <div className="info-item">
              <span className="info-title">注册日期：</span>
              <input className="info-input" type="date" />
            </div>
            <div
              className={`blue-btn change-pwd-btn pull-right ${this.state.showPwd ? 'hidden' : ''}`}
              role="button"
              onClick={() => this.changePwd()}
            >
            修改密码
            </div>
            <div className={`change-pwd-panel ${this.state.showPwd ? '' : 'hidden'}`}>
              <div className="info-item">
                <span className="info-title">旧密码：</span>
                <input className="info-input" name="oldPassword" type="text" />
              </div>
              <div className="info-item">
                <span className="info-title">新密码：</span>
                <input className="info-input" name="password" type="text" />
              </div>
              <div className="info-item">
                <span className="info-title">确认密码：</span>
                <input className="info-input" name="confirmPassword" type="text" />
              </div>
              <div
                className="blue-btn pull-right"
                role="button"
                onClick={() => this.submitData()}
              >
              保存信息
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(BaseInfo);
