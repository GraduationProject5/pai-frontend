import React from 'react';
import {Icon} from 'antd';
import styles from './Database.scss'
import CreateTableModal from './CreateTableModal/CreateTableModal';

class Database extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  setCreateTableModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  render() {
    const modalVisible = this.state.modalVisible;
    const tableListMock = ["test1", "test2", "test3"];

    return (
      <div className={styles.container}>
        <div className={styles.tableList}>
          {
            tableListMock.map((table, index) => {
              return (
                <div className={styles.tableItem} key={index}>
                  <Icon type="database" style={{color: "#79589f", marginRight: 8}}/>
                  {table}
                </div>
              );
            })
          }
        </div>
        <button className={styles.createTableBtn} onClick={() => this.setCreateTableModalVisible(true)}>
          <Icon style={{marginRight: 8}} type="plus-circle"/>创建表
        </button>
        <CreateTableModal visible={modalVisible} setModalVisible={this.setCreateTableModalVisible}/>
      </div>
    );
  }
}

Database.propTypes = {};

export default Database;
