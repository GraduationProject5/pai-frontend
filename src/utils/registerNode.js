import G6Editor from '@antv/g6-editor';
import componentImgUrl from "../assets/img/component.svg";
import databaseImgUrl from "../assets/img/database.svg";

const {Flow} = G6Editor;

// 注册节点基类
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


/**
 * 注册机器学习组件
 * @param components
 */
export function registerComponents(components) {
  components.map((component) => {
    if (component.isChild) { // 组件
      Flow.registerNode(component.type, {
        label: component.name,
        color_type: '#1890FF',
        typeImgUrl: componentImgUrl,
        state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg',
        // 设置锚点
        anchor: component.anchor
      }, 'model-card');
    } else { // 组件大类
      registerComponents(component.children);
    }
  })
}

/**
 * 注册数据源
 */
export function registerDataTable() {
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
}


