import React from 'react';
import styles from './Template.scss';
import experiment from '../../../../assets/img/default-experiment.png';

const Template = ({className}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.level}>基础</div>
      <br/>
      <h3>心脏病预测案例</h3>
      <img alt="pic" src={experiment}/>
      <div className={styles.desc}>本实验主要是展示平台在线预测能力，通过中学生的在校园行为预测期末成绩以及对于成绩的关键影响因子。期末成绩以及对于成绩的关键影响因子</div>
    </div>
  );
};

Template.propTypes = {};

export default Template;
