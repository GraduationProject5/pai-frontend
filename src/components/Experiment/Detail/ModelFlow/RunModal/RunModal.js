import React from 'react';
import {Form, Modal, Input, Tabs} from 'antd';
import {connect} from 'dva';
import styles from './RunModel.scss';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class RunModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: 'text',   // 实验类别
    }
  }

  handleSubmit = () => {
    const type = this.state.type;
    console.log("experiment", this.props.experimentData);
    if (type === 'picture') {
      this.props.form.validateFields(['batch', 'epoach'], (err, values) => {
        if (!err) {
          this.props.setModalVisible(false);
          this.props.dispatch({
            type: 'experiment/runPicExperiment',
            payload: {
              batch: values.batch,
              epoach: values.epoach,
              expName: this.props.experimentData.experimentName
            }
          });
        }
      });
    } else {
      this.props.form.validateFields(['tableName', 'target'], (err, values) => {
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
    }
  };

  cancel = () => {
    // 清空表单数据
    this.props.form.resetFields();
    this.props.setModalVisible(false);
  };

  handleTableTabChange = (key) => {
    this.setState({
      type: key
    });
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
        <Tabs defaultActiveKey="text" onChange={(key) => this.handleTableTabChange(key)}>
          <TabPane tab="文本分析" key="text">
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
          </TabPane>
          <TabPane tab="图片分类" key="picture">
            <Form>
              <FormItem label="batch">
                {getFieldDecorator('batch', {
                  rules: [{required: true, message: '请输入batch'}],
                })(
                  <Input placeholder="请输入batch"/>,
                )}
              </FormItem>
              <FormItem label="epoach">
                {getFieldDecorator('epoach', {
                  rules: [{required: true, message: '请输入epoach'}],
                })(
                  <Input placeholder="请输入epoach"/>,
                )}
              </FormItem>
            </Form>
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}

const WrappedForm = Form.create()(RunModal);

export default connect()(WrappedForm);
