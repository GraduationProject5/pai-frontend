import React from 'react';
import styles from './Template.scss';
import experiment from '../../../../assets/img/default-experiment.png';

const Template = ({className, createHandler, data}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.level}>基础</div>
      <br/>
      <h3>{data.title}</h3>
      <img alt="pic" src={experiment}/>
      <div className={styles.desc}>{data.desc}</div>
      <div className={styles.mask}>
        <span onClick={() => createHandler(true, data.type)}>从模板创建</span>
      </div>
    </div>
  );
};

Template.propTypes = {};

export default Template;
