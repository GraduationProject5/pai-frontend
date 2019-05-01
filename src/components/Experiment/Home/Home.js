import React from 'react';
import Template from './Template/Template';
import styles from './Home.scss';
import CreateExperimentModal from "./CreateExperimentModal/CreateExperimentModal";

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  setCreateExperimentModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  render() {
    const modalVisible = this.state.modalVisible;
    return (
      <div className={styles.container}>
        <div className={styles.list}>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((template, index) => {
              return <Template className={styles.item} key={index} createHandler={this.setCreateExperimentModalVisible}/>;
            })
          }
        </div>
        <CreateExperimentModal visible={modalVisible} setModalVisible={this.setCreateExperimentModalVisible}/>
      </div>
    );
  }
}

Home.propTypes = {};

export default Home;
