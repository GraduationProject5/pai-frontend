import React from 'react';
import Navigator from './Navigator.js';
import Contextmenu from './Contextmenu.js';
import Itempanel from '../ItemPanel/Itempanel.js';
import PropertyPanel from './PropertyPanel.js';
import Editor from './Editor.js';
import Canvas from './Canvas.js';
import styles from './ModelFlow.scss';

export default class BaseFlowEditor extends Editor {
  componentDidMount() {
    super.componentDidMount();
    const editor = this.editor;
    const page = editor.getCurrentPage();

    // 设置节点的文字标签
    page.getGraph().node({
      label(model) {
        return model.name;
      }
    });

    // 输入锚点不可以连出边
    page.on('hoveranchor:beforeaddedge', ev => {
      if (ev.anchor.type === 'input') {
        ev.cancel = true;
      }
    });
    page.on('dragedge:beforeshowanchor', ev => {
      // 只允许目标锚点是输入，源锚点是输出，才能连接
      if (!(ev.targetAnchor.type === 'input' && ev.sourceAnchor.type === 'output')) {
        ev.cancel = true;
      }
      // 如果拖动的是目标方向，则取消显示目标节点中已被连过的锚点
      if (ev.dragEndPointType === 'target' && page.anchorHasBeenLinked(ev.target, ev.targetAnchor)) {
        ev.cancel = true;
      }
      // 如果拖动的是源方向，则取消显示源节点中已被连过的锚点
      if (ev.dragEndPointType === 'source' && page.anchorHasBeenLinked(ev.source, ev.sourceAnchor)) {
        ev.cancel = true;
      }
    });
  }

  render() {
    const {curZoom, minZoom, maxZoom, selectedModel} = this.state;
    console.log(selectedModel);
    const mode = this.props.mode;

    return (
      <div className={styles.editor}>
        <Contextmenu editor={this.editor} selectedModel={selectedModel}/>
        <Itempanel editor={this.editor} mode={mode} className={styles.itemPanel}/>
        <Canvas editor={this.editor} className={styles.canvas}/>
        <div className={styles.detail}>
          <PropertyPanel editor={this.editor} selectedModel={selectedModel} className={styles.propertyPanel}/>
          <Navigator
            editor={this.editor}
            curZoom={curZoom}
            minZoom={minZoom}
            maxZoom={maxZoom}
            changeZoom={this.changeZoom.bind(this)}/>
        </div>
      </div>);
  }
}
