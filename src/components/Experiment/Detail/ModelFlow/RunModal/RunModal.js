import React from 'react';
import PropTypes from "prop-types";
import {Form, Modal, Input} from 'antd';
import { connect } from 'dva';
import styles from './RunModel.scss';

const FormItem = Form.Item;

class RunModal extends React.Component {


  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.setModalVisible(false);
        this.props.dispatch({
          type: 'experiment/runExperiment',
          payload: {
            tableName: values.tableName,
            target: values.target,
            requestBody: this.props.experimentData
          }
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
    const {visible} = this.props;

    return (
      <Modal
        title="运行实验"
        visible={visible}
        width={600}
        wrapClassName={styles.modal}
        okText="运行"
        cancelText="取消"
        onOk={this.handleSubmit}
        onCancel={this.cancel}
      >
        <Form>
          <FormItem label="数据表名">
            {getFieldDecorator('tableName', {
              rules: [{required: true, message: '请输入数据表名'}],
            })(
              <Input placeholder="请输入数据表名"/>,
            )}
          </FormItem>
          <FormItem label="目标字段">
            {getFieldDecorator('target', {
              rules: [{required: true, message: '请输入目标字段'}],
            })(
              <Input placeholder="请输入目标字段"/>,
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const WrappedForm = Form.create()(RunModal);
RunModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};

export default connect()(WrappedForm);
