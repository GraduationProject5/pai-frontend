import React from 'react';
import {Tree} from 'antd';
import {connect} from 'dva';
import styles from '../Itempanel.scss';
import componentImgUrl from '../../../../../assets/img/component.svg';

const DirectoryTree = Tree.DirectoryTree;
const TreeNode = Tree.TreeNode;

class Component extends React.Component {

  renderTree = (component) => {
    if (component.componentID) {
      const item = (
        <span className={`${styles.item} getItem`} data-name={component.componentName} data-shape={component.funcName}
              data-nodeid={component.componentID}
              data-type="node"
              data-kind="component"
              data-settings={JSON.stringify(component.settings)}
              data-size="170*34">
                    <img alt="type" src={componentImgUrl} className={styles.typeImg}/>{component.componentName}
                </span>);
      return (
        <TreeNode className={styles.leaf} title={item} key={component.componentID}/>);
    } else {
      return (
        <TreeNode className={styles.parent} title={component.sectionName} key={`section${component.sectionID}`}>
          {
            component.components.map((child) => {
              return this.renderTree(child);
            })
          }
        </TreeNode>);
    }
  }
  ;

  render() {
    const {components} = this.props;

    return (
      <DirectoryTree
        multiple
        className={styles.container}
      >
        {
          components.map && components.map((component) => {
            return this.renderTree(component)
          })
        }
      </DirectoryTree>
    );
  }
}

function mapStateToProps(state) {
  const {components} = state.experiment;
  return {components};
}


Component.propTypes = {};

export default connect(mapStateToProps)(Component);
