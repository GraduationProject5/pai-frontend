import React from 'react';
import {Icon} from 'antd';
import {connect} from 'dva';
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

  componentDidMount() {
    this.props.dispatch({
      type: 'data/getAllTable'
    });
  }

  setCreateTableModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  render() {
    const modalVisible = this.state.modalVisible;
    const {dataTables} = this.props;
    return (
      <div className={stylesDatabase.container}>
        <div className={stylesDatabase.tableList}>
          {
            dataTables.map((table) => {
              return (
                <div className={stylesDatabase.tableItem} key={table.id}>
                  <span className={`${styles.item} getItem`} data-name={`${table.name}`} data-shape="read-data-table"
                        data-type="node" data-size="170*34">
                    <img src={databaseImgUrl} className={styles.typeImg}/>{table.name}
                  </span>
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


function mapStateToProps(state) {
  const {dataTables} = state.data;
  return {dataTables};
}

Database.propTypes = {};

export default connect(mapStateToProps)(Database);
