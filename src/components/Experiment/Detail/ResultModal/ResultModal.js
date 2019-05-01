import React from 'react';
import {Modal, Button} from 'antd';
import {connect} from 'dva';
import styles from './ResultModal.scss';
import ResultTable from './ResultTable';

class ResultModal extends React.Component {

  handleCancel = (e) => {
    this.props.setModalVisible(false);
  };

  /**
   * 提取数据库表数据的参数和数据
   * @param data
   */
  handleTableData = (data) => {
    const one = data && data[0];
    const paras = [];
    one && Object.keys(one).map(key => {
      paras.push({
        title: key,
        dataIndex: key,
        key: key
      });
      return key;
    });
    // 如果没有 id 属性，添加 id 属性，React 要求
    data.map((item, index) => {
      if (!item.feTableIndex) {
        item.feTableIndex = index
      }
      return item;
    });
    return {
      data,
      paras
    }
  };

  render() {
    const {visible, kind, result, tableData} = this.props;
    return (
      <Modal
        title="查看数据"
        visible={visible}
        centered
        onCancel={this.handleCancel}
        footer={[
          <Button key="close" onClick={this.handleCancel}>关闭</Button>,
        ]}
        width={1100}
        className={styles.container}
      >
        {
          kind === 'table' ?
            <ResultTable table={this.handleTableData(tableData)} rowKey="feTableIndex"/>
            : result.type === 'table' ?
            <ResultTable table={result} rowKey="id"/> : null
        }
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  const {result} = state.component;
  const {tableData} = state.data;
  return {result, tableData};
}


ResultModal.propTypes = {};

export default connect(mapStateToProps)(ResultModal);
