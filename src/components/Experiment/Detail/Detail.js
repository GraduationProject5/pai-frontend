import React from 'react';
import styles from './Detail.scss';
import ModelFlow from './ModelFlow/ModelFlow';

class Detail extends React.Component {


  render() {
    const mode = this.props.mode;

    return (
      <div className={styles.container}>
        <ModelFlow mode={mode}/>
      </div>
    );
  }
}

Detail.propTypes = {};

export default Detail;

