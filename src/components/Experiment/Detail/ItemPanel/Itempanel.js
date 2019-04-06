import React from 'react';
import G6Editor from '@antv/g6-editor';
import PropTypes from 'prop-types';
import Component from './Component/Component';
import Database from './Database/Database';
import Experiment from './Experiment/Experiment';
import Model from './Model/Model';
import styles from './Itempanel.scss';

class Itempanel extends React.Component {
  createItempanel(container) {
    return new G6Editor.Itempannel({
      container
    });
  }

  componentDidMount() {
    const editor = this.props.editor;
    const itempanel = this.createItempanel(this.itempanelContainer);
    editor.add(itempanel);
  }

  module = {
    experiment: Experiment,
    database: Database,
    component: Component,
    model: Model
  };

  render() {
    const mode = this.props.mode;
    const ModeModule = this.module[mode];
    return (
      <div className={`${this.props.className}`} ref={el => { this.itempanelContainer = el; }}>
        <ModeModule />
      </div>);
  }
}
Itempanel.propTypes = {
  editor: PropTypes.object,
};
export default Itempanel;
