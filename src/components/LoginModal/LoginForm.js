import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button } from 'antd';
import { connect } from 'dva';
import styles from './LoginModal.scss';

const FormItem = Form.Item;

class LoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = {
          email: values.email,
          password: values.loginPassword,
        };
        this.props.dispatch({
          type: 'user/login',
          payload: data,
        });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, goTo } = this.props;
    return (
      <div
        className={`${styles.login} ${visible ? styles.visible : styles.invisible}`}
      >
        <Form onSubmit={this.handleSubmit} className={styles.form}>
          <h3>登录你的账号</h3>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: '请输入邮箱' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 18, color: '#79589F' }} />} placeholder="邮箱" />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('loginPassword', {
              rules: [{ required: true, message: '请输入密码' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ fontSize: 18, color: '#79589F' }} />} type="password"
                placeholder="密码"
              />,
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className={styles.form_button}>
              登录
            </Button>
          </FormItem>
        </Form>
        <div className={styles.footer}>
          <a href="">忘记密码</a>
          <a onClick={goTo}>注册</a>
        </div>
      </div>
    );
  }
}
const WrappedNormalForm = Form.create()(LoginForm);
WrappedNormalForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  goTo: PropTypes.func.isRequired,
};
export default connect()(WrappedNormalForm);
