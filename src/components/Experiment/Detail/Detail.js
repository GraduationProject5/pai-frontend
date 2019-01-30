import React from 'react';
import styles from './Detail.scss';
import Experiment from './Experiment/Experiment';
import Model from './Model/Model';
import Database from './Database/Database';
import Component from './Component/Component';

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
        <div className={styles.mode}>
          {
            <ModeModule />
          }
        </div>
        <div className={styles.detail}>
          实验详情展示
        </div>
      </div>
    );
  }
}

Detail.propTypes = {};

export default Detail;

