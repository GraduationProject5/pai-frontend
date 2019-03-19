import React from 'react';
import G6Editor from '@antv/g6-editor';
import {Icon} from 'antd'
import PropTypes from 'prop-types';
import styles from './Toolbar.scss';

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

  run = () => {
    console.log("运行项目");
    const data = this.props.editor.getCurrentPage().save();
    console.log(data);
  };

  render() {
    return (
      <div className={styles.container} ref={el => {
        this.toolbarContainer = el;
      }}>
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

Toolbar.propTypes = {
  editor: PropTypes.object
};
export default Toolbar;
