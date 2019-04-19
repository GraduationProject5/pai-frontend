import React from 'react';
import G6Editor from '@antv/g6-editor';
import {Icon, message} from 'antd';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import styles from './Toolbar.scss';
import {save} from "../../../../services/ExperimentService";
import {sendToken} from "../../../../services/UserService";

class Toolbar extends React.Component {
  createToolbar(container) {
    return new G6Editor.Toolbar({
      container
    });
  }

  componentDidMount() {
    const editor = this.props.editor;
    const toolbar = this.createToolbar(this.toolbarContainer);
    editor.add(toolbar);
  }

  save = () => {
    const data = this.props.editor.getCurrentPage().save();
    const nodes = data.nodes;
    nodes && nodes.map(node => {
      if (node.settings) {
        node.settings = JSON.parse(node.settings);
      }
      return node;
    });
    const requestBody = {
        ...data,
        experimentID: this.props.experimentDetail.experimentID,
      }
    ;
    sendToken(save, requestBody).then(response => {
      if (response && response.result) {
        message.success('保存实验场景成功');
      } else {
        message.error('保存实验场景失败');
      }
    }).catch(err => {
      message.error('保存实验场景失败');
    })
  };

  run = () => {
    this.props.dispatch({
      type: 'experiment/runExperiment',
      payload: {
      }
    });
  };

  render() {
    return (
      <div className={styles.container} ref={el => {
        this.toolbarContainer = el;
      }}>
        <Icon type="save" className={styles.command} title="保存" onClick={this.save}/>
        <Icon type="caret-right" className={styles.command} title="运行" onClick={this.run}/>
        <span className={styles.separator}/>
        <Icon type="undo" data-command="undo" className={`${styles.command} command`} title="撤销"/>
        <Icon type="redo" data-command="redo" className={`${styles.command} command`} title="重做"/>
        <span className={styles.separator}/>
        <Icon type="zoom-in" data-command="zoomIn" className={`${styles.command} command`} title="放大"/>
        <Icon type="zoom-out" data-command="zoomOut" className={`${styles.command} command`} title="缩小"/>
        <Icon type="drag" data-command="autoZoom" className={`${styles.command} command`} title="适应画布"/>
        <Icon type="pause" data-command="resetZoom" className={`${styles.command} command`} title="实际尺寸"/>
        <span className={styles.separator}/>
        <Icon type="table" data-command="multiSelect" className={`${styles.command} command`} title="多选"/>
      </div>);
  }
}

function mapStateToProps(state) {
  const {experimentDetail} = state.experiment;
  return {experimentDetail};
}


Toolbar.propTypes = {
  editor: PropTypes.object
};

export default connect(mapStateToProps)(Toolbar);
