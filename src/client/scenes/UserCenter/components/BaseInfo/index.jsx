import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Form, Input, Button } from 'antd';
import updateService from './services/updateService';

const FormItem = Form.Item;

class BaseInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPwd: false,
    };
  }

  handleChangePwd() {
    this.setState({
      showPwd: !this.state.showPwd,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = {};
    const { userInfo } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (values.name !== userInfo.name) {
          data.name = values.name;
        }
        if (values.email !== userInfo.email) {
          data.email = values.email;
        }
        if (values.password) {
          data.old_password = values.password;
          data.new_password = values.newPassword;
        }
      } else {
        message.error(err);
      }
    });
    // 要获取的三个值
    updateService(this.props, data);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { userInfo = {} } = this.props;

    const formItemLayout = {
      labelCol: {
        md: { span: 4 },
        lg: { span: 3 },
      },
      wrapperCol: {
        md: { span: 9 },
        lg: { span: 8 },
      },
    };

    const tailFormItemLayout = {
      labelCol: {
        md: { span: 2 },
        lg: { span: 2 },
      },
      wrapperCol: {
        md: {
          span: 6,
          offset: 8,
        },
        lg: {
          span: 5,
          offset: 6,
        },
      },
    };

    return (
      <div className="component-user-center-base-info">
        <Form onSubmit={e => this.handleSubmit(e)}>
          <FormItem
            {...formItemLayout}
            label="用户名"
            hasFeedback
          >
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: '请填入用户名!',
              }],
              initialValue: userInfo.name,
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="电子邮箱"
            hasFeedback
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email',
                message: '请输入正确的电子邮箱!',
              }, {
                required: true,
                message: '请填入电子邮箱!',
              }],
              initialValue: userInfo.email,
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="注册日期"
            hasFeedback
          >
            <span>2017-10-4</span>
          </FormItem>
          {
            this.state.showPwd ? (
              <div className="change-pwd-area">
                <FormItem
                  {...formItemLayout}
                  label="旧密码"
                  hasFeedback
                >
                  {getFieldDecorator('password', {
                    rules: [{
                      required: true,
                      message: '请填入旧密码!',
                    }],
                  })(
                    <Input type="password" />,
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="新密码"
                  hasFeedback
                >
                  {getFieldDecorator('newPassword', {
                    rules: [{
                      required: true,
                      message: '请填入新密码!',
                    }],
                  })(
                    <Input type="password" />,
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="确认新密码"
                  hasFeedback
                >
                  {getFieldDecorator('newPasswordConfirm', {
                    rules: [{
                      required: true,
                      message: '请确认新密码!',
                    }],
                  })(
                    <Input type="password" />,
                  )}
                </FormItem>
              </div>
            ) : null
          }
          <FormItem {...tailFormItemLayout}>
            <Button className="pull-right" type="primary" htmlType="submit">保存</Button>
            <Button className="change-pwd-btn pull-right" onClick={() => this.handleChangePwd()}>{this.state.showPwd ? '取消修改密码' : '修改密码'}</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
export default connect(state => ({
  userInfo: state.userInfo,
}))(Form.create({})(BaseInfo));
