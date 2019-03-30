import React from 'react';
import {Modal} from 'antd';
import {connect} from 'dva';
import styles from './ResultModal.scss';
import ResultTable from './ResultTable';

class ResultModal extends React.Component {

  handleOk = (e) => {
    this.props.setModalVisible(false);
  };

  handleCancel = (e) => {
    this.props.setModalVisible(false);
  };

  render() {
    const {visible, result, tableData} = this.props;
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
        {
          result.type === 'table' ?
            <ResultTable table={result}/> : null
        }
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  const {result} = state.component;
  const { tableData } = state.data;
  return {result, tableData};
}


ResultModal.propTypes = {};

export default connect(mapStateToProps)(ResultModal);
