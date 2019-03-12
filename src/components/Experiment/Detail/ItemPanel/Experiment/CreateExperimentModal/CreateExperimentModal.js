import React from 'react';
import PropTypes from "prop-types";
import {Form, Modal, Input} from 'antd';
import styles from './CreateExperimentModal.scss';

const FormItem = Form.Item;

class CreateExperimentModal extends React.Component {


  render() {
    const {getFieldDecorator} = this.props.form;
    const {visible, setModalVisible} = this.props;

    return (
      <Modal
        title="新建实验"
        visible={visible}
        width={600}
        wrapClassName={styles.modal}
        okText="创建"
        onOk={null}
        onCancel={() => setModalVisible(false)}
      >
        <Form onSubmit={this.handleSubmit}>
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

const WrappedNormalForm = Form.create()(CreateExperimentModal);
WrappedNormalForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};

export default WrappedNormalForm;
