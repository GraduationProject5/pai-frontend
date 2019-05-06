import React from 'react';
import {Icon} from 'antd';
import {connect} from 'dva';
import stylesExperiment from './Experiment.scss';
import CreateExperimentModal from "./CreateExperimentModal/CreateExperimentModal";
import ExperimentList from "./ExperimentList";

class Experiment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'experiment/getAllExperiment',
    });
  }

  setCreateExperimentModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  render() {
    const {experiments, experimentDetail} = this.props;
    const modalVisible = this.state.modalVisible;

    return (
      <div className={stylesExperiment.container}>
        <ExperimentList experiments={experiments} experimentDetail={experimentDetail}/>
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
  const {experiments, experimentDetail} = state.experiment;
  return {experiments, experimentDetail};
}

Experiment.propTypes = {};

export default connect(mapStateToProps)(Experiment);
