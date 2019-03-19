import React from 'react';
import {Icon} from 'antd';
import styles from '../Itempanel.scss'
import stylesDatabase from './Database.scss';
import CreateTableModal from './CreateTableModal/CreateTableModal';
import databaseImgUrl from '../../../../../assets/img/database.svg';

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

  tableListMock = [
    <span className={`${styles.item} getItem`} data-name="读数据表1" data-shape="read-data-table" data-type="node" data-size="170*34">
      <img src={databaseImgUrl} className={styles.typeImg}/>读数据表1
    </span>,
    <span className={`${styles.item} getItem`} data-name="读数据表2" data-shape="read-data-table" data-type="node" data-size="170*34">
      <img src={databaseImgUrl} className={styles.typeImg}/>读数据表2
    </span>,
    <span className={`${styles.item} getItem`} data-name="读数据表3" data-shape="read-data-table" data-type="node" data-size="170*34">
      <img src={databaseImgUrl} className={styles.typeImg}/>读数据表3
    </span>
  ];

  render() {
    const modalVisible = this.state.modalVisible;

    return (
      <div className={stylesDatabase.container}>
        <div className={stylesDatabase.tableList}>
          {
            this.tableListMock.map((table, index) => {
              return (
                <div className={stylesDatabase.tableItem} key={index}>
                  {table}
                </div>
              );
            })
          }
        </div>
        <button className={stylesDatabase.createTableBtn} onClick={() => this.setCreateTableModalVisible(true)}>
          <Icon style={{marginRight: 8}} type="plus-circle"/>创建表
        </button>
        <CreateTableModal visible={modalVisible} setModalVisible={this.setCreateTableModalVisible}/>
      </div>
    );
  }
}

Database.propTypes = {};

export default Database;
