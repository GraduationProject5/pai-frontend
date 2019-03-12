import React from 'react';
import { Input } from 'antd';
import styles from './Detail.scss';
import Experiment from './ItemPanel/Experiment/Experiment';
import Model from './ItemPanel/Model/Model';
import Database from './ItemPanel/Database/Database';
import Component from './ItemPanel/Component/Component';
import ModelFlow from './ModelFlow/ModelFlow';

const TextArea = Input.TextArea;

class Detail extends React.Component {



  render() {
    const mode = this.props.mode;

    return (
      <div className={styles.container}>
        {/*<div className={styles.mode}>*/}
          {/*{*/}
            {/*<ModeModule />*/}
          {/*}*/}
        {/*</div>*/}
        <div className={styles.detail}>
          <ModelFlow mode={mode}/>
        </div>

      </div>
    );
  }
}

Detail.propTypes = {};

export default Detail;

