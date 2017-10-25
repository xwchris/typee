import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Icon, Modal } from 'antd';
import showLoginOrRegistPopup from 'services/loginService';
import loginService from './services/loginService';

class Login extends Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        loginService(this.props, {
          login_card: values.name,
          password: values.password,
        });
      }
    });
  }

  handleCancel() {
    // 关闭登录框
    showLoginOrRegistPopup(this.props.dispatch, 'showLoginPopup', false);
  }

  // 渲染
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        width="400"
        visible={this.props.showLoginPopup}
        title="快速登录"
        onCancel={() => this.handleCancel()}
        onOk={e => this.handleSubmit(e)}
        okText="登录"
      >
        <Form onSubmit={e => this.handleSubmit(e)} className="login-form">
          <Form.Item>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                placeholder="用户名"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                type="password"
                placeholder="密码"
              />,
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default connect(
  state => ({
    showLoginPopup: state.showLoginPopup,
  }),
)(Form.create()(Login));
