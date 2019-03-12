import React from 'react';
import { Tree, Icon } from 'antd';
import styles from './Experiment.scss';
import CreateExperimentModal from "./CreateExperimentModal/CreateExperimentModal";

const DirectoryTree = Tree.DirectoryTree;
const TreeNode = Tree.TreeNode;

class Experiment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  setCreateExperimentModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  onSelect = () => {
    console.log('Trigger Select');
  };

  onExpand = () => {
    console.log('Trigger Expand');
  };

  render() {
    const modalVisible = this.state.modalVisible;

    return (
      <div className={styles.container}>
        <div>
          <DirectoryTree
            multiple
            defaultExpandAll
            onSelect={this.onSelect}
            onExpand={this.onExpand}
            className={styles.container}
          >
            <TreeNode title="parent 0" key="0-0">
              <TreeNode title="leaf 0-0" key="0-0-0"  isLeaf />
              <TreeNode title="leaf 0-1" key="0-0-1"  />
              <TreeNode title="leaf 0-2" key="0-0-2">
                <TreeNode title="leaf 0-2-0" key="0-2-0" />
                <TreeNode title="leaf 0-2-1" key="0-2-1" />
              </TreeNode>
            </TreeNode>
            <TreeNode title="parent 1" key="0-1">
              <TreeNode title="leaf 1-0" key="0-1-0"  />
              <TreeNode title="leaf 1-1" key="0-1-1"  />
            </TreeNode>
          </DirectoryTree>
        </div>
        <button className={styles.createExperimentBtn} onClick={() => this.setCreateExperimentModalVisible(true)}>
          <Icon style={{marginRight: 8}} type="plus-circle"/>新建实验
        </button>
        <CreateExperimentModal visible={modalVisible} setModalVisible={this.setCreateExperimentModalVisible}/>
      </div>
    );
  }
}

Experiment.propTypes = {};

export default Experiment;
