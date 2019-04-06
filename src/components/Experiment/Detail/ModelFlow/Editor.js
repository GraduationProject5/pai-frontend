import React from 'react';
import G6Editor from '@antv/g6-editor';
import './Editor.scss';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedModel: {}, // 当前选中项数据模型
      curZoom: 1, // 当前缩放比率
      minZoom: 0.5, // 最小缩放比率
      maxZoom: 2 // 最大缩放比率
    };
  }
  changeZoom(zoom) {
    const editor = this.editor;
    const page = editor.getCurrentPage();
    page.zoom(zoom);
  }
  toggleGrid(ev) {
    const editor = this.editor;
    const page = editor.getCurrentPage();
    if (ev.target.checked) {
      page.showGrid();
    } else {
      page.hideGrid();
    }
  }
  updateGraph(key, value) {
    const editor = this.editor;
    editor.executeCommand(() => {
      const page = editor.getCurrentPage();
      const selectedItems = page.getSelected();
      selectedItems.forEach(item => {
        const updateModel = {};
        updateModel[key] = value;
        page.update(item, updateModel);
      });
    });
  }
  componentWillMount() {
    this.editor = new G6Editor();
  }
  componentDidMount() {
    const editor = this.editor;
    const pages = editor.getComponentsByType('page');
    pages.forEach(page => {
      page.on('afteritemselected', ev => {
        this.setState({
          selectedModel: ev.item.getModel()
        });
      });
      page.on('afterzoom', ev => {
        this.setState({
          curZoom: ev.updateMatrix[0]
        });
      });
    });
  }
}
