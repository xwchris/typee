import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Input, Icon, Modal } from 'antd';
import showLoginOrRegistPopup from 'services/loginService';
import registService from './services/registService';

class Regist extends Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        registService(this.props.dispatch, {
          name: values.name,
          email: values.email,
          password: values.password,
        });
      }
    });
  }

  handleCancel() {
    // 关闭登录框
    showLoginOrRegistPopup(this.props.dispatch, 'showRegistPopup', false);
  }

  // 渲染
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        width="400"
        visible={this.props.showRegistPopup}
        title="快速注册"
        onCancel={() => this.handleCancel()}
        onOk={e => this.handleSubmit(e)}
        okText="立即注册"
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
            {getFieldDecorator('emial', {
              rules: [{ required: true, message: '请输入邮箱!' }, { type: 'email', mesage: '请输入正确的邮箱!' }],
            })(
              <Input
                prefix={<Icon type="mail" style={{ fontSize: 13 }} />}
                placeholder="邮箱"
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
          <Form.Item>
            {getFieldDecorator('passwordConfirm', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                type="password"
                placeholder="确认密码"
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
    showRegistPopup: state.showRegistPopup,
  }),
)(Form.create()(Regist));
