import React from 'react';
import PropTypes from "prop-types";
import {Form, Modal, Input} from 'antd';
import { connect } from 'dva';
import styles from './CreateExperimentModal.scss';

const FormItem = Form.Item;

class CreateExperimentModal extends React.Component {


  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = {
          name: values.name,
          description: values.desc
        };
        this.props.dispatch({
          type: 'experiment/create',
          payload: data,
        });
      }
    });
  };

  cancel = () => {
    // 清空表单数据
    this.props.form.resetFields();
    this.props.setModalVisible(false);
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {visible, } = this.props;

    return (
      <Modal
        title="新建实验"
        visible={visible}
        width={600}
        wrapClassName={styles.modal}
        okText="创建"
        cancelText="取消"
        onOk={this.handleSubmit}
        onCancel={this.cancel}
      >
        <Form>
          <FormItem label="名称">
            {getFieldDecorator('name', {
              rules: [{required: true, message: '请输入实验名称'}],
            })(
              <Input placeholder="请输入实验名称"/>,
            )}
          </FormItem>
          <FormItem label="描述">
            {getFieldDecorator('desc', {
              rules: [{required: true, message: '请输入描述文本'}],
            })(
              <Input placeholder="请输入描述文本"/>,
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const WrappedForm = Form.create()(CreateExperimentModal);
WrappedForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};

export default connect()(WrappedForm);
