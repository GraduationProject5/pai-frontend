import React from 'react';
import G6Editor from '@antv/g6-editor';
import PropTypes from 'prop-types';
import {Input} from 'antd';
import styles from './PropertyPanel.scss';

const TextArea = Input.TextArea;

class PropertyPanel extends React.Component {
  createPropertyPanel(container) {
    return new G6Editor.Detailpannel({
      container
    });
  }

  componentDidMount() {
    const {editor} = this.props;
    const propertyPanel = this.createPropertyPanel(this.propertyPanelContainer);
    editor.add(propertyPanel);
  }

  render() {
    const { selectedModel , className } = this.props;
    return (
      <div className={`${styles.container} ${className}`} ref={el => {
        this.propertyPanelContainer = el;
      }}>
        <div data-status="node-selected" className={`${styles.panel} pannel`}>
          <div className={styles["panel-title"]}>模型详情</div>
          <div className={styles["block-container"]}>
            <p>shape:{selectedModel.shape}</p>
            <p>name:{selectedModel.name}</p>
          </div>
        </div>
        <div data-status="canvas-selected" className={`${styles.property} pannel`}>
          <h3>实验属性</h3>
          <div className={styles.propertyContent}>
            <div className={styles.item}>
              <span className={styles.key}>项目名称</span>
              <span className={styles.value}>graduation</span>
            </div>
            <div className={styles.item}>
              <span className={styles.key}>创建日期</span>
              <span className={styles.value}>2019-1-31 21:05:18</span>
            </div>
            <div className={styles.inputItem}>
              <div className={styles.key}>名称</div>
              <Input/>
            </div>
            <div className={styles.inputItem}>
              <div className={styles.key}>描述</div>
              <TextArea rows={4}/>
            </div>
          </div>
        </div>
      </div>);
  }
}

PropertyPanel.propTypes = {
  editor: PropTypes.object,
  selectedModel: PropTypes.object
};

export default PropertyPanel;
