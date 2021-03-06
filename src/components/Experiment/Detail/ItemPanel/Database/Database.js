import React from 'react';
import {Icon, Popconfirm, message} from 'antd';
import {connect} from 'dva';
import styles from '../Itempanel.scss'
import stylesDatabase from './Database.scss';
import CreateTableModal from './CreateTableModal/CreateTableModal';
import databaseImgUrl from '../../../../../assets/img/database.svg';
import {dropTable} from "../../../../../services/DataService";
import {sendToken} from "../../../../../services/UserService";
import DataTableList from "./DataTableList";

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

  // deleteTable = (id) => {
  //   sendToken(dropTable, id).then(response => {
  //       console.log("delete", response);
  //       this.props.dispatch({
  //         type: 'data/getAllTable'
  //       });
  //       message.success("删除成功")
  //   }).catch(err => {
  //     console.log("delete err", err);
  //     message.error("删除失败")
  //   });
  // };

  render() {
    const modalVisible = this.state.modalVisible;
    const {dataTables} = this.props;
    return (
      <div className={stylesDatabase.container}>
        <DataTableList dataTables={dataTables}/>
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
