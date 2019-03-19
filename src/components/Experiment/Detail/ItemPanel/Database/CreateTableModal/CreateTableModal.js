import React from 'react';
import PropTypes from "prop-types";
import {Modal, Steps, Button, message} from 'antd';
import { connect } from 'dva';
import styles from './CreateTableModal.scss';
import CreateTable from './CreateTable';
import UploadData from './UploadData';

const Step = Steps.Step;

class CreateTableModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      current: 0, // 处理步骤阶段
      tableName: '', // 表名
    };
  }

  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
    // if (this.createTableRef.validate()) {
    //   const current = this.state.current + 1;
    //   this.setState({ current });
    // }
  };

  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  };

  submit = () => {
    // TODO 异步处理
    if (this.uploadDataRef.validate()) {
      // 创建表
      this.createTableRef.submit();
      // 上传数据
      this.uploadDataRef.submit();
    }
  };

  cancel = () => {
    this.props.setModalVisible(false);
  };

  onCreateTableRef = (ref) => {
    this.createTableRef = ref;
  };

  onUploadDataRef = (ref) => {
    this.uploadDataRef = ref;
  };

  /**
   * 用于 CreateTable 与 UploadData 之间的通信，通信 tableName
   * 如果不是同个父组件可以采用发布订阅模式
   * @param tableName
   */
  changeTableName = (tableName) => {
    this.setState({tableName})
  };

  render() {
    const {visible, setModalVisible} = this.props;
    const { current, tableName } = this.state;

    const steps = [{
      title: '创建表',
      content: <CreateTable onRef={this.onCreateTableRef} changeTableName={this.changeTableName}/>,
    }, {
      title: '上传数据',
      content: <UploadData onRef={this.onUploadDataRef} tableName={tableName}/>,
    }];

    return (
      <Modal
        title="创建表"
        visible={visible}
        footer={null}
        width={600}
        wrapClassName={styles.modal}
        onCancel={() => setModalVisible(false)}
      >
        <div className={styles.container}>
          <Steps current={current}>
            {steps.map(item => <Step key={item.title} title={item.title} />)}
          </Steps>
          <div className={styles.content}>{steps[current].content}</div>
          <div className={styles.action}>
            {
              current < steps.length - 1
              && <Button type="primary" onClick={() => this.next()}>下一步</Button>
            }
            {
              current === steps.length - 1
              && <Button type="primary" onClick={() => this.submit()}>提交</Button>
            }
            {
              current > 0
              && (
                <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                  上一步
                </Button>
              )
            }
            <Button onClick={() => this.cancel()}>关闭</Button>
          </div>
        </div>
      </Modal>
    );
  }
}

CreateTableModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};

export default connect()(CreateTableModal);
