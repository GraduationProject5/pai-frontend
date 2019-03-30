import React from 'react';
import G6Editor from '@antv/g6-editor';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import styles from './Contextmenu.scss';
import ResultModal from '../ResultModal/ResultModal';

class Contextmenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  createContextmenu(container) {
    return new G6Editor.Contextmenu({
      container
    });
  }

  componentDidMount() {
    const editor = this.props.editor;
    const contextmenu = this.createContextmenu(this.contextmenuContainer);
    editor.add(contextmenu);
  }

  // 获取对应组件结果
  getResult = (model) => {
    if (model.kind === 'table') {
      this.props.dispatch({
        type: 'data/getTableData',
        payload: {
          tableName: model.name,
        }
      });
    } else if (model.kind === 'component' ){
      this.props.dispatch({
        type: 'component/getResult',
        payload: {
          nodeId: +model.nodeid,
        }
      });
    }

  };

  showResultModal = (visible, nodeid) => {
    this.setState({modalVisible: visible})
  };

  render() {
    const selectedModel = this.props.selectedModel;
    const { modalVisible } = this.state;
    return (
      <div className={styles.container} ref={el => {
        this.contextmenuContainer = el;
      }}>
        <div data-status="node-selected" className="menu">
          <div data-command="copy" className={`${styles.command} command`}>
            <span>复制</span>
            <span>copy</span>
          </div>
          <div data-command="delete" className={`${styles.command} command`}>
            <span>删除</span>
            <span>delete</span>
          </div>
          <div className={`${styles.command}`}>
            <span>{selectedModel.shape}</span>
            <span>{selectedModel.name}</span>
          </div>
          <div className={`${styles.command}`}>
            <span onClick={() => {
              this.showResultModal(true);
              this.getResult(selectedModel);
            }}>查看数据</span>
            <ResultModal visible={modalVisible} setModalVisible={this.showResultModal} />
          </div>
        </div>
        <div data-status="edge-selected" className="menu">
          <div data-command="delete" className={`${styles.command} command`}>
            <span>删除</span>
            <span>delete</span>
          </div>
        </div>
        <div data-status="group-selected" className="menu">
          <div data-command="copy" className={`${styles.command} command`}>
            <span>复制</span>
            <span>copy</span>
          </div>
          <div data-command="delete" className={`${styles.command} command`}>
            <span>删除</span>
            <span>delete</span>
          </div>
          <div data-command="unGroup" className={`${styles.command} command`}>
            <span>解组</span>
            <span>unGroup</span>
          </div>
        </div>
        <div data-status="canvas-selected" className="menu">
          <div data-command="undo" className={`${styles.command} command`}>
            <span>撤销</span>
            <span>undo</span>
          </div>
          <div data-command="redo" className={`${styles.command} command`}>
            <span>重做</span>
            <span>redo</span>
          </div>
          <div data-command="pasteHere" className={`${styles.command} command`}>
            <span>粘贴</span>
            <span>pasteHere</span>
          </div>
        </div>
        <div data-status="multi-selected" className="menu">
          <div data-command="copy" className={`${styles.command} command`}>
            <span>复制</span>
            <span>copy</span>
          </div>
          <div data-command="paste" className={`${styles.command} command`}>
            <span>粘贴</span>
            <span>paste</span>
          </div>
          <div data-command="addGroup" className={`${styles.command} command`}>
            <span>归组</span>
            <span>addGroup</span>
          </div>
          <div data-command="delete" className={`${styles.command} command`}>
            <span>删除</span>
            <span>delete</span>
          </div>
        </div>
      </div>);
  }
}

Contextmenu.propTypes = {
  editor: PropTypes.object,
  selectedModel: PropTypes.object
};
export default connect()(Contextmenu);
