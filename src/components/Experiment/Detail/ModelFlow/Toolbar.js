import React from 'react';
import G6Editor from '@antv/g6-editor';
import PropTypes from 'prop-types';
import styles from './Toolbar.scss';
class Toolbar extends React.Component {
  createToolbar(container) {
    return new G6Editor.Toolbar({
      container
    });
  }
  getCreateToolbar() {
    const { createToolbar } = this.props;
    return createToolbar ? createToolbar : this.createToolbar;
  }
  componentDidMount() {
    const { editor } = this.props;
    const createToolbar = this.getCreateToolbar();
    const toolbar = createToolbar(this.toolbarContainer);
    editor.add(toolbar);
  }
  render() {
    return (<div className={styles.container} ref={el => { this.toolbarContainer = el; }}>
      {/*<link rel="stylesheet" type="text/css" href="//at.alicdn.com/t/font_598462_3xve1872wizzolxr.css" />*/}
      <i data-command="undo" className={styles.command} title="撤销"/>
      <i data-command="redo" className={styles.command} title="重做"/>
      <span className="separator"/>
      <i data-command="copy" className={styles.command} title="复制"></i>
      <i data-command="paste" className={styles.command} title="粘贴"/>
      <i data-command="delete" className={styles.command} title="删除"></i>
      <span className={styles.separator}></span>
      <i data-command="zoomIn" className={styles.command} title="放大"></i>
      <i data-command="zoomOut" className={styles.command} title="缩小"/>
      <i data-command="autoZoom" className={styles.command} title="适应画布"></i>
      <i data-command="resetZoom" className={styles.command} title="实际尺寸"></i>
      <span className={styles.separator}></span>
      <i data-command="toBack" className={styles.command} title="层级后置"></i>
      <i data-command="toFront" className={styles.command} title="层级前置"></i>
      <span className={styles.separator}></span>
      <i data-command="multiSelect" className={styles.command} title="多选"></i>
      <i data-command="addGroup" className={styles.command} title="成组"></i>
      <i data-command="unGroup" className={styles.command} title="解组"></i>
      <a href="https://www.yuque.com/antv/g6-editor"> G6-Editor 文档</a>
    </div>);
  }
}
Toolbar.propTypes = {
  createToolbar: PropTypes.function,
  editor: PropTypes.object
};
export default Toolbar;
