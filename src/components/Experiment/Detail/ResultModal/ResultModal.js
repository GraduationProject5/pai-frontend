import React from 'react';
import {Modal, Button} from 'antd';
import styles from './ResultModal.scss';
import ResultTable from './ResultTable';

class ResultModal extends React.Component {

  constructor(props) {
    super(props);
  }


  handleOk = (e) => {
    this.props.setModalVisible(false);
  };

  handleCancel = (e) => {
    this.props.setModalVisible(false);
  };

  render() {
    const {visible} = this.props;
    return (
      <Modal
        title="查看数据"
        visible={visible}
        centered
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        width={1100}
        className={styles.container}
      >
        <ResultTable />
      </Modal>
    );
  }
}

ResultModal.propTypes = {};

export default ResultModal;
