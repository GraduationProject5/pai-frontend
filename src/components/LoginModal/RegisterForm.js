import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import {Form, Icon, Input, Button} from 'antd';
import styles from './LoginModal.scss';

const FormItem = Form.Item;

class RegisterForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hasGetCheckCode: false,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = {
          email: values.registerEmail,
          code: values.code,
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

  getCheckCode = () => {
    this.props.form.validateFields(['registerEmail'], (err, values) => {
      if (!err) {
        this.setState({
          hasGetCheckCode: true
        });
        this.props.dispatch({
          type: 'user/getCheckCode',
          payload: {
            email: values.registerEmail
          },
        });
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {visible, goTo} = this.props;
    const {hasGetCheckCode} = this.state;

    return (
      <div
        className={`${styles.register} ${visible ? styles.visible : styles.invisible}`}
      >
        <Form onSubmit={this.handleSubmit} className={styles.form}>
          <h3>注册账号</h3>
          <FormItem
          >
            {getFieldDecorator('registerEmail', {
              rules: [{required: true, message: '请输入邮箱'}],
            })(
              <Input style={{width: 238}} prefix={<Icon type="user" style={{fontSize: 18, color: '#79589F'}}/>}
                     placeholder="邮箱"
              />,
            )}
            <Button type="primary" style={{marginLeft: 12, width: 100}} onClick={this.getCheckCode}>
              获取验证码
            </Button>
          </FormItem>
          <FormItem>
            {getFieldDecorator('code', {
              rules: [{required: true, message: '请输入验证码!'}],
            })(
              <Input
                prefix={<Icon type="code" style={{fontSize: 18, color: '#79589F'}}/>}
                placeholder="验证码"
              />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{required: true, message: '请输入密码!'}],
            })(
              <Input
                prefix={<Icon type="lock" style={{fontSize: 18, color: '#79589F'}}/>} type="password"
                placeholder="密码"
              />,
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className={styles.form_button} disabled={!hasGetCheckCode}>
              注册
            </Button>
          </FormItem>
        </Form>
        <div className={styles.footer}>
          <span/>
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
