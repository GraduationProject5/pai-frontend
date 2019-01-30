import React from 'react';
import { connect } from 'dva';
import styles from './page.scss';
import MainLayout from '../components/MainLayout/MainLayout';
import Experiment from '../components/Experiment';

function ExperimentPage({ location }) {
  return (
    <MainLayout location={location}>
      <Experiment />
    </MainLayout>
  );
}

ExperimentPage.propTypes = {
};

export default connect()(ExperimentPage);
