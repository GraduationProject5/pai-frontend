import React from 'react';
import PropTypes from "prop-types";
import {Modal, Steps, Button} from 'antd';
import {connect} from 'dva';
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
    if (this.createTableRef.validate()) {
      const current = this.state.current + 1;
      this.setState({current});
    }
  };

  prev = () => {
    const current = this.state.current - 1;
    this.setState({current});
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
    this.createTableRef.clear();
    if (this.uploadDataRef) {
      this.uploadDataRef.clear();
    }
    this.props.setModalVisible(false);
    this.setState({current: 0});
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
    const {current, tableName} = this.state;
    let isCreateTable = current === 0;

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
            <Step key='创建表' title='创建表'/>
            <Step key='上传数据' title='上传数据'/>
          </Steps>
          <div className={styles.content}>
            <CreateTable style={{display: isCreateTable ? 'block' : 'none'}} onRef={this.onCreateTableRef}
                         changeTableName={this.changeTableName}/>
            <UploadData style={{display: isCreateTable ? 'none' : 'block'}} onRef={this.onUploadDataRef}
                        tableName={tableName}/>
          </div>
          <div className={styles.action}>
            {
              isCreateTable ?
                <Button type="primary" onClick={() => this.next()}>下一步</Button>
                :
                <React.Fragment>
                  <Button type="primary" onClick={() => this.submit()}>提交</Button>
                  <Button style={{marginLeft: 8}} onClick={() => this.prev()}>
                    上一步
                  </Button>
                </React.Fragment>
            }
            <Button onClick={() => this.cancel()} style={{marginLeft: 8}}>关闭</Button>
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
