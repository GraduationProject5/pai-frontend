import React from 'react';
import {Icon} from 'antd';
import {connect} from 'dva';
import stylesExperiment from './Experiment.scss';
import CreateExperimentModal from "./CreateExperimentModal/CreateExperimentModal";
import experimentImgUrl from "../../../../../assets/img/experiment.svg";

class Experiment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'experiment/getAllExperiment'
    });
  }

  setCreateExperimentModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  getExperimentDetail = (id) => {
    console.log("实验id" + id);
    this.props.dispatch({
      type: 'experiment/getExperimentDetail',
      payload: {
        id: id
      }
    });
  };

  render() {
    const {experiments} = this.props;
    const modalVisible = this.state.modalVisible;

    return (
      <div className={stylesExperiment.container}>
        <div className={stylesExperiment.experimentList}>
          {
            experiments.map((experiment) => {
              return (
                <div className={stylesExperiment.item} key={experiment.experimentID}
                     tabIndex={experiment.experimentID}
                      onClick={() => this.getExperimentDetail(experiment.experimentID)}>
                  <img alt="type" src={experimentImgUrl} className={stylesExperiment.typeImg}/>{experiment.experimentName}
                </div>
              );
            })
          }
        </div>
        <button className={stylesExperiment.createExperimentBtn}
                onClick={() => this.setCreateExperimentModalVisible(true)}>
          <Icon style={{marginRight: 8}} type="plus-circle"/>新建实验
        </button>
        <CreateExperimentModal visible={modalVisible} setModalVisible={this.setCreateExperimentModalVisible}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {experiments} = state.experiment;
  return {experiments};
}

Experiment.propTypes = {};

export default connect(mapStateToProps)(Experiment);
