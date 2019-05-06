import React from 'react';
import stylesExperiment from "./Experiment.scss";
import experimentImgUrl from "../../../../../assets/img/experiment.svg";
import {connect} from 'dva';

const ExperimentList = ({experiments, experimentDetail, dispatch}) => {
  const getExperimentDetail = (id) => {
    dispatch({
      type: 'experiment/getExperimentDetail',
      payload: {
        id: id
      }
    });
  };

  return (
    <div className={stylesExperiment.experimentList}>
      {
        experiments && experiments.map((experiment) => {
          return (
            <div className={stylesExperiment.item} key={experiment.experimentID}
                 tabIndex={experiment.experimentID}
                 style={experimentDetail.experimentID === experiment.experimentID ? { backgroundColor: '#D9D1DE'} : null}
                 onClick={() => getExperimentDetail(experiment.experimentID)}>
              <img alt="type" src={experimentImgUrl} className={stylesExperiment.typeImg}/>{experiment.experimentName}
            </div>
          );
        })
      }
    </div>
  );
};

export default connect()(ExperimentList);

