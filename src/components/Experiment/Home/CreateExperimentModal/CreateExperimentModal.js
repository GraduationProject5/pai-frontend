import React from 'react';
import PropTypes from "prop-types";
import {Form, Modal, Input, message} from 'antd';
import { connect } from 'dva';
import styles from './CreateExperimentModal.scss';
import {sendToken} from "../../../../services/UserService";
import {create, createTextAnalysisExperiment} from "../../../../services/ExperimentService";

const FormItem = Form.Item;

class CreateExperimentModal extends React.Component {


  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = {
          name: values.name,
          description: values.desc
        };
        if (this.props.type === 1) { // 文本分类
          sendToken(createTextAnalysisExperiment, data).then(response => {
            if (response && response.result) {
              message.success('创建实验成功');
              // 清空表单数据
              this.props.form.resetFields();
              this.props.setModalVisible(false);
              // 更新实验列表
              this.props.dispatch({
                type: 'experiment/getAllExperiment'
              });
            } else {
              message.error('创建实验失败');
            }
          }).catch(err => {
            message.error('创建实验失败');
          });
        }
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
