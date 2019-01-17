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
          <h3>Join Us!</h3>
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
            {getFieldDecorator('repassword', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ fontSize: 18, color: '#79589F' }} />} type="password"
                placeholder="Confirm Password"
              />,
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className={styles.form_button}>
              Sign up
            </Button>
          </FormItem>
        </Form>
        <div className={styles.footer}>
          <span />
          <div>
            <span>Already have an account?</span>
            <a onClick={goTo}>Log in</a>
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
