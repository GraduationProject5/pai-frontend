import React from 'react';
import { Tree } from 'antd';
import styles from './Model.scss';

const DirectoryTree = Tree.DirectoryTree;
const TreeNode = Tree.TreeNode;

class Model extends React.Component {

  onSelect = () => {
    console.log('Trigger Select');
  };

  onExpand = () => {
    console.log('Trigger Expand');
  };

  render() {
    return (
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
    );
  }
}

Model.propTypes = {};

export default Model;
