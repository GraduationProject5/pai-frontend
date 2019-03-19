import React from 'react';
import Navigator from './Navigator.js';
import Contextmenu from './Contextmenu.js';
import Itempanel from '../ItemPanel/Itempanel.js';
import PropertyPanel from './PropertyPanel.js';
import Editor from './Editor.js';
import Canvas from './Canvas.js';
import G6Editor from '@antv/g6-editor';
import styles from './ModelFlow.scss';
import databaseImgUrl from '../../../../assets/img/database.svg';
import componentImgUrl from '../../../../assets/img/component.svg';

const {Flow} = G6Editor;

// 注册模型卡片基类
Flow.registerNode('model-card', {
  draw(item) {
    const group = item.getGraphicGroup();
    const model = item.getModel();
    const width = 184;
    const height = 40;
    const x = -width / 2;
    const y = -height / 2;
    const borderRadius = 4;
    const keyShape = group.addShape('rect', {
      attrs: {
        x,
        y,
        width,
        height,
        radius: borderRadius,
        fill: 'white',
        stroke: '#CED4D9'
      }
    });
    // 左侧色条
    group.addShape('path', {
      attrs: {
        path: [
          ['M', x, y + borderRadius],
          ['L', x, y + height - borderRadius],
          ['A', borderRadius, borderRadius, 0, 0, 0, x + borderRadius, y + height],
          ['L', x + borderRadius, y],
          ['A', borderRadius, borderRadius, 0, 0, 0, x, y + borderRadius]
        ],
        fill: this.color_type
      }
    });
    // 类型 logo
    group.addShape('image', {
      attrs: {
        img: this.typeImgUrl,
        x: x + 16,
        y: y + 12,
        width: 20,
        height: 16
      }
    });
    // 名称文本
    const label = model.label ? model.label : this.label;
    group.addShape('text', {
      attrs: {
        text: label,
        x: x + 52,
        y: y + 13,
        textAlign: 'start',
        textBaseline: 'top',
        fill: 'rgba(0,0,0,0.65)'
      }
    });
    // 状态 logo
    group.addShape('image', {
      attrs: {
        img: this.state_icon_url,
        x: x + 158,
        y: y + 12,
        width: 16,
        height: 16
      }
    });
    return keyShape;
  },
  // 设置锚点
  anchor: [
    [0.5, 0], // 上面边的中点
    [0.5, 1] // 下边边的中点
  ]
});

// k 均值聚类
Flow.registerNode('k-means', {
  label: 'k 均值聚类',
  color_type: '#1890FF',
  typeImgUrl: componentImgUrl,
  state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg',
  // 设置锚点
  anchor: [
    [0.5, 0, {
      type: 'input'
    }], // 上面边的中点
    [0.5, 1, {
      type: 'output'
    }] // 下边边的中点
  ]
}, 'model-card');

// 随机森林
Flow.registerNode('random-forest', {
  label: '随机森林',
  color_type: '#9254DE',
  typeImgUrl: componentImgUrl,
  state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg',
  // 设置锚点
  anchor: [
    [0.5, 0, {
      type: 'input'
    }],
    [0.5, 1, {
      type: 'output'
    }]
  ]
}, 'model-card');

// PS-SMART 分类
Flow.registerNode('PS-SMART', {
  label: 'PS-SMART 分类',
  color_type: '#1890FF',
  typeImgUrl: componentImgUrl,
  state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg',
  // 设置锚点
  anchor: [
    [0.5, 0, {
      type: 'input'
    }],
    [0.33, 1, {
      type: 'output'
    }],
    [0.66, 1, {
      type: 'output'
    }]
  ]
}, 'model-card');

// 朴素贝叶斯
Flow.registerNode('Bayes', {
  label: '朴素贝叶斯',
  color_type: '#9254DE',
  typeImgUrl: componentImgUrl,
  state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
  // 设置锚点
  anchor: [
    [0.5, 0, {
      type: 'input'
    }],
    [0.5, 1, {
      type: 'output'
    }]
  ]
}, 'model-card');

// 读数据表
Flow.registerNode('read-data-table', {
  label: '读数据表',
  color_type: '#FAAD14',
  typeImgUrl: databaseImgUrl,
  state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg',
  // 设置锚点
  anchor: [
    [0.5, 1, {
      type: 'output'
    }]
  ]
}, 'model-card');

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
    const {curZoom, minZoom, maxZoom, selectedModel, inputingLabel} = this.state;
    console.log(selectedModel);
    const mode = this.props.mode;
    // const labelInput = (
    //   <div className={styles.p}>
    //     名称：
    //     <Input
    //       size="small"
    //       className={`${styles.input} ${styles["name-input"]}`}
    //       value={inputingLabel ? inputingLabel : selectedModel.label}
    //       onChange={ev => {
    //         this.setState({
    //           inputingLabel: ev.target.value
    //         });
    //       }}
    //       onBlur={ev => {
    //         this.updateGraph('label', ev.target.value);
    //         this.setState({
    //           inputingLabel: null
    //         });
    //       }}
    //     />
    //   </div>
    // );
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
