import React from 'react';
import {Modal, Button} from 'antd';

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
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    );
  }
}

ResultModal.propTypes = {};

export default ResultModal;
