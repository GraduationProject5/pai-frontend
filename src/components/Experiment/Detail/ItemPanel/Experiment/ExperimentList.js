import React from 'react';
import stylesExperiment from "./Experiment.scss";
import experimentImgUrl from "../../../../../assets/img/experiment.svg";

const ExperimentList = ({experiments, experimentDetail}) => {
  return (
    <div className={stylesExperiment.experimentList}>
      {
        experiments && experiments.map((experiment) => {
          return (
            <div className={stylesExperiment.item} key={experiment.experimentID}
                 tabIndex={experiment.experimentID}
                 style={experimentDetail.experimentID === experiment.experimentID ? { backgroundColor: '#D9D1DE'} : null}
                 onClick={() => this.getExperimentDetail(experiment.experimentID)}>
              <img alt="type" src={experimentImgUrl} className={stylesExperiment.typeImg}/>{experiment.experimentName}
            </div>
          );
        })
      }
    </div>
  );
};

export default ExperimentList;

