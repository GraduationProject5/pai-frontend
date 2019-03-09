import React from 'react';
import { Input } from 'antd';
import styles from './Detail.scss';
import Experiment from './Experiment/Experiment';
import Model from './Model/Model';
import Database from './Database/Database';
import Component from './Component/Component';
import ModelFlow from './ModelFlow/ModelFlow';

const TextArea = Input.TextArea;

class Detail extends React.Component {

  module = {
    experiment: Experiment,
    database: Database,
    component: Component,
    model: Model
  };

  render() {
    const mode = this.props.mode;
    const ModeModule = this.module[mode];

    return (
      <div className={styles.container}>
        {/*<div className={styles.mode}>*/}
          {/*{*/}
            {/*<ModeModule />*/}
          {/*}*/}
        {/*</div>*/}
        <div className={styles.detail}>
          <ModelFlow />
        </div>
        <div className={styles.property}>
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
              <Input />
            </div>
            <div className={styles.inputItem}>
              <div className={styles.key}>描述</div>
              <TextArea rows={4} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Detail.propTypes = {};

export default Detail;

