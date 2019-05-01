import React from 'react';
import {Table} from 'antd';

class ResultTable extends React.Component {

  render() {
    const table = this.props.table;
    return (
      <Table
        columns={table.paras}
        dataSource={table.data}
        rowKey={this.props.rowKey}
        scroll={{y: 380, x: 1300}} pagination={false}/>
    );
  }
}

ResultTable.propTypes = {};

export default ResultTable;
