import React from 'react';
import G6Editor from '@antv/g6-editor';
import PropTypes from 'prop-types';
import styles from './Itempanel.scss';

class Itempanel extends React.Component {
  createItempanel(container) {
    return new G6Editor.Itempannel({
      container
    });
  }
  getCreateItempanel() {
    const { createItempanel } = this.props;
    return createItempanel ? createItempanel : this.createItempanel;
  }
  componentDidMount() {
    const { editor } = this.props;
    const createItempanel = this.getCreateItempanel();
    const itempanel = createItempanel(this.itempanelContainer);
    editor.add(itempanel);
  }
  render() {
    return (
      <div className={styles.container} ref={el => { this.itempanelContainer = el; }}>
        {this.props.content}
      </div>);
  }
}
Itempanel.propTypes = {
  createItempanel: PropTypes.function,
  editor: PropTypes.object,
  content: PropTypes.node
};
export default Itempanel;
