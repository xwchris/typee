import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import updateService from './services/updateService';


class BaseInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPwd: false,
    };
  }

  componentDidUpdate(nextProps) {
    // 页面初始化
    if (this.props.userInfo !== nextProps.userInfo) {
      this.init();
    }
  }

  // 输入框改变事件
  onChange(event) {
    const ele = event.target;
    this.setState({
      [ele.name]: ele.value,
    });
  }

  // 初始化数据
  init() {
    const { userInfo = {} } = this.props;

    this.setState({
      name: userInfo.name,
      email: userInfo.email,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
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

    const data = {};

    // 如果修改用户名
    if (this.state.name !== this.props.userInfo.name) {
      data.name = this.state.name;
    }

    // 如果修改邮箱
    if (this.state.email !== this.props.userInfo.email) {
      data.email = this.state.email;
    }

    // 如果修改密码
    if (this.state.showPwd) {
      data.old_password = this.state.oldPassword;
      data.new_password = this.state.newPassword;
    }

    // 要获取的三个值
    updateService(this.props, data);
  }

  // 验证更新数据
  validate() {
    const validateMap = {
      username: {
        value: this.form.name.value.trim(),
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
        validFlag: this.state.showPwd,
      },
      newPassword: {
        value: this.form.newPassword.value.trim(),
        errorMsg: '密码不能为空',
        validMsg: '密码格式不正确',
        validFlag: this.state.showPwd,
      },
      confirmPassword: {
        value: this.form.confirmPassword.value.trim(),
        errorMsg: '密码不能为空',
        validMsg: '两次密码不一致',
        valid: () => this.form.confirmPassword.value.trim() === validateMap.newPassword.value,
        validFlag: this.state.showPwd,
      },
    };

    return Object.keys(validateMap).every((item) => {
      if (validateMap[item].validFlag !== undefined && !validateMap[item].validFlag) {
        return true;
      }
      if (!validateMap[item].value) {
        message.error(validateMap[item].errorMsg);
        return false;
      } else if (validateMap[item].valid && !validateMap[item].valid()) {
        message.error(validateMap[item].validMsg);
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
              <input
                className="info-input"
                name="name"
                type="text"
                value={this.state.name}
                onChange={e => this.onChange(e)}
              />
            </div>
            <div className="info-item">
              <span className="info-title">邮箱：</span>
              <input
                className="info-input"
                name="email"
                type="text"
                value={this.state.email}
                onChange={e => this.onChange(e)}
              />
            </div>
            <div className="info-item">
              <span className="info-title">注册日期：</span>
              <input className="info-input" type="date" />
            </div>
            <div className={`change-pwd-panel ${this.state.showPwd ? '' : 'hidden'}`}>
              <div className="info-item">
                <span className="info-title">旧密码：</span>
                <input
                  className="info-input"
                  name="oldPassword"
                  type="text"
                  value={this.state.oldPassword}
                  onChange={e => this.onChange(e)}
                />
              </div>
              <div className="info-item">
                <span className="info-title">新密码：</span>
                <input
                  className="info-input"
                  name="newPassword"
                  type="text"
                  value={this.state.newPassword}
                  onChange={e => this.onChange(e)}
                />
              </div>
              <div className="info-item">
                <span className="info-title">确认密码：</span>
                <input
                  className="info-input"
                  name="confirmPassword"
                  type="text"
                  value={this.state.confirmPassword}
                  onChange={e => this.onChange(e)}
                />
              </div>
            </div>
            <div
              className="blue-btn pull-right"
              role="button"
              onClick={() => this.submitData()}
            >
              保存信息
            </div>
            <div
              className={`blue-btn change-pwd-btn pull-right ${this.state.showPwd ? 'hidden' : ''}`}
              role="button"
              onClick={() => this.changePwd()}
            >
              修改密码
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    userInfo: state.userInfo,
  }),
)(BaseInfo);
