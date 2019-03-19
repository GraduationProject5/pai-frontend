import React from 'react';
import {Tree} from 'antd';
import styles from '../Itempanel.scss';
import componentImgUrl from '../../../../../assets/img/component.svg';

const DirectoryTree = Tree.DirectoryTree;
const TreeNode = Tree.TreeNode;

class Component extends React.Component {

  onSelect = () => {
    console.log('Trigger Select');
  };

  onExpand = () => {
    console.log('Trigger Expand');
  };

  itemMock = [
    <span className={`${styles.item} getItem`} data-name="K 均值聚类" data-shape="k-means" data-type="node" data-size="170*34">
      <img src={componentImgUrl} className={styles.typeImg}/>K 均值聚类
    </span>,
    <span className={`${styles.item} getItem`} data-name="随机森林" data-shape="random-forest" data-type="node" data-size="170*34">
      <img src={componentImgUrl} className={styles.typeImg}/>随机森林
    </span>,
    <span className={`${styles.item} getItem`} data-name="PS-SMART 分类" data-shape="PS-SMART" data-type="node" data-size="170*34">
      <img src={componentImgUrl} className={styles.typeImg}/>PS-SMART 分类
    </span>,
    <span className={`${styles.item} getItem`} data-name="读数据表" data-shape="read-data-table" data-type="node" data-size="170*34">
      <img src={componentImgUrl} className={styles.typeImg}/>读数据表
    </span>,
    <span className={`${styles.item} getItem`} data-name="朴素贝叶斯" data-shape="Bayes" data-type="node" data-size="170*34">
      <img src={componentImgUrl} className={styles.typeImg}/>朴素贝叶斯
    </span>,
    <span className={`${styles.item} getItem`} data-name="test" data-shape="test" data-type="node" data-size="170*34">
      <img src={componentImgUrl} className={styles.typeImg}/>test
    </span>,
  ];

  render() {
    return (
      <DirectoryTree
        multiple
        // defaultExpandAll
        // showIcon={true}
        onSelect={this.onSelect}
        onExpand={this.onExpand}
        className={styles.container}
      >
        <TreeNode className={styles.parent} title="parent 0" key="0-0">
          <TreeNode className={styles.leaf} title={this.itemMock[0]} key="0-0-0" isLeaf/>
          <TreeNode className={styles.leaf} title="leaf 0-1" key="0-0-1"/>
          <TreeNode title="leaf 0-2" key="0-0-2">
            <TreeNode className={styles.leaf} title={this.itemMock[1]} key="0-2-0"/>
            <TreeNode className={styles.leaf} title={this.itemMock[2]} key="0-2-1"/>
          </TreeNode>
        </TreeNode>
        <TreeNode className={styles.parent} title="parent 1" key="0-1">
          <TreeNode className={styles.leaf} title={this.itemMock[3]} key="0-1-0"/>
          <TreeNode className={styles.leaf} title={this.itemMock[4]} key="0-1-1"/>
          <TreeNode className={styles.leaf} title={this.itemMock[5]} key="0-1-2"/>
        </TreeNode>
      </DirectoryTree>
    );
  }
}

Component.propTypes = {};

export default Component;
