import React from 'react';
import G6Editor from '@antv/g6-editor';
import PropTypes from 'prop-types';
import styles from './Canvas.scss';
import ToolBar from "./Toolbar";

class Canvas extends React.Component {
  createCanvas(container) {
    return new G6Editor.Flow({
      graph: {
        container
      },
      align: {
        grid: true
      }
    });
  }

  componentDidMount() {
    const editor = this.props.editor;
    const canvas = this.createCanvas(this.canvasContainer);
    editor.add(canvas);
  }

  render() {
    return (
      <div className={`${styles.container} ${this.props.className}`}>
        <ToolBar editor={this.props.editor}/>
        <div className={styles.canvas} ref={el => {
          this.canvasContainer = el;
        }}/>
      </div>
    );
  }
}

Canvas.propTypes = {
  editor: PropTypes.object
};
export default Canvas;
