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
          username: values.username,
          password: values.password,
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
          <h3>Log in to your account</h3>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 18, color: '#79589F' }} />} placeholder="Username" />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ fontSize: 18, color: '#79589F' }} />} type="password"
                placeholder="Password"
              />,
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className={styles.form_button}>
              Log in
            </Button>
          </FormItem>
        </Form>
        <div className={styles.footer}>
          <a href="">Forgot password</a>
          <a onClick={goTo}>Join free</a>
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
