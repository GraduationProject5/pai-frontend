import React from 'react';
import G6Editor from '@antv/g6-editor';
import PropTypes from 'prop-types';
import {connect} from 'dva';
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
    this.canvas = canvas;
    editor.add(canvas);


    const experimentDetail = this.props.experimentDetail;
    const canvasData = {
      nodes: experimentDetail.nodes,
      edges: experimentDetail.edges
    };

    if (editor.getCurrentPage()) {
      editor.getCurrentPage().read(canvasData);
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.experimentDetail.experimentID !== nextProps.experimentDetail.experimentID) {
      if (nextProps.experimentDetail) {
        const experimentDetail = nextProps.experimentDetail;
        const canvasData = {
          nodes: experimentDetail.nodes,
          edges: experimentDetail.edges
        };
        const page = this.props.editor.getCurrentPage();
        page.clearSelected();
        this.props.editor.getCurrentPage().read(canvasData);
      }
    }
  }

  render() {
    const editor = this.props.editor;
    return (
      <div className={`${styles.container} ${this.props.className}`}>
        <ToolBar editor={editor}/>
        <div className={styles.canvas} ref={el => {
          this.canvasContainer = el;
        }}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {experimentDetail} = state.experiment;
  return {experimentDetail};
}


Canvas.propTypes = {
  editor: PropTypes.object
};
export default connect(mapStateToProps)(Canvas);
