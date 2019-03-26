import React from 'react';
import {Table} from 'antd';

class ResultTable extends React.Component {

  render() {
    const table = this.props.table;
    return (
      <Table
        columns={table.paras}
        dataSource={table.data}
        rowKey='id'
        scroll={{y: 380}} pagination={false}/>
    );
  }
}

ResultTable.propTypes = {};

export default ResultTable;
