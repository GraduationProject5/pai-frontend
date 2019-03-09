import React from 'react';
import G6Editor from '@antv/g6-editor';
import PropTypes from 'prop-types';
import styles from './Contextmenu.scss';

class Contextmenu extends React.Component {
  createContextmenu(container) {
    return new G6Editor.Contextmenu({
      container
    });
  }
  getCreateContextmenu() {
    const { createContextmenu } = this.props;
    return createContextmenu ? createContextmenu : this.createContextmenu;
  }
  componentDidMount() {
    const { editor } = this.props;
    const createContextmenu = this.getCreateContextmenu();
    const contextmenu = createContextmenu(this.contextmenuContainer);
    editor.add(contextmenu);
  }
  render() {
    return (<div className={styles.container} ref={el => { this.contextmenuContainer = el; }}>
      <div data-status="node-selected" className="menu">
        <div data-command="copy" className={`${styles.command} command`}>
          <span>复制</span>
          <span>copy</span>
        </div>
        <div data-command="delete" className={`${styles.command} command`}>
          <span>删除</span>
          <span>delete</span>
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
  createContextmenu: PropTypes.function,
  editor: PropTypes.object
};
export default Contextmenu;
