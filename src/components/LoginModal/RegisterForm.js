import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button } from 'antd';
import styles from './LoginModal.scss';

const FormItem = Form.Item;

class RegisterForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = {
          username: values.username,
          password: values.password,
        };
        this.props.dispatch({
          type: 'user/register',
          payload: data,
        });
        // 清空表单数据
        this.props.form.resetFields();
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, goTo } = this.props;
    return (
      <div
        className={`${styles.register} ${visible ? styles.visible : styles.invisible}`}
      >
        <Form onSubmit={this.handleSubmit} className={styles.form}>
          <h3>注册账号</h3>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 18, color: '#79589F' }} />} placeholder="用户名" />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ fontSize: 18, color: '#79589F' }} />} type="password"
                placeholder="密码"
              />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('repassword', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ fontSize: 18, color: '#79589F' }} />} type="password"
                placeholder="确认密码"
              />,
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className={styles.form_button}>
              注册
            </Button>
          </FormItem>
        </Form>
        <div className={styles.footer}>
          <span />
          <div>
            <a onClick={goTo}>登录</a>
          </div>
        </div>
      </div>
    );
  }
}

const WrappedNormalForm = Form.create()(RegisterForm);
WrappedNormalForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  goTo: PropTypes.func.isRequired,
};
export default connect()(WrappedNormalForm);
