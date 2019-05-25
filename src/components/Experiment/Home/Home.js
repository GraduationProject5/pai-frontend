import React from 'react';
import Template from './Template/Template';
import styles from './Home.scss';
import CreateExperimentModal from "./CreateExperimentModal/CreateExperimentModal";

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      type: 1
    };
  }

  setCreateExperimentModalVisible = (visible, type) => {
    this.setState({modalVisible: visible, type});
  };

  Mock = [
    {
      title: '文本分析',
      desc:'本实验用于文本分析',
      type: 1
    },
    {
      title: '图片分类',
      desc:'本实验用于图片分类',
      type: 2
    }];

  render() {
    const modalVisible = this.state.modalVisible;
    const type = this.state.type;

    return (
      <div className={styles.container}>
        <div className={styles.list}>
          {
            this.Mock.map((template, index) => {
              return <Template data={template} className={styles.item} key={index} createHandler={this.setCreateExperimentModalVisible}/>;
            })
          }
        </div>
        <CreateExperimentModal visible={modalVisible} setModalVisible={this.setCreateExperimentModalVisible} type={type}/>
      </div>
    );
  }
}

Home.propTypes = {};

export default Home;
