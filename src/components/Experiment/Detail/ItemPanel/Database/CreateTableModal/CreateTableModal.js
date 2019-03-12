import React from 'react';
import PropTypes from "prop-types";
import {Modal, Steps, Button, message} from 'antd';
import styles from './CreateTableModal.scss';
import CreateTable from './CreateTable';
import UploadData from './UploadData';

const Step = Steps.Step;

const steps = [{
  title: '创建表',
  content: <CreateTable />,
}, {
  title: '上传数据',
  content: <UploadData />,
}];

class CreateTableModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      current: 0, // 处理步骤阶段
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const {visible, setModalVisible} = this.props;
    const { current } = this.state;

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
              && <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
            }
            {
              current > 0
              && (
                <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                  上一步
                </Button>
              )
            }
            <Button onClick={() => setModalVisible(false)}>关闭</Button>
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

export default CreateTableModal;
