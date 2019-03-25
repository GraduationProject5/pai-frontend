import React from 'react';
import {Tree} from 'antd';
import {connect} from 'dva';
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
    <span className={`${styles.item} getItem`} data-name="K 均值聚类" data-shape="k-means" data-type="node"
          data-size="170*34">
      <img src={componentImgUrl} className={styles.typeImg}/>K 均值聚类
    </span>,
    <span className={`${styles.item} getItem`} data-name="随机森林" data-shape="random-forest" data-type="node"
          data-size="170*34">
      <img src={componentImgUrl} className={styles.typeImg}/>随机森林
    </span>,
    <span className={`${styles.item} getItem`} data-name="PS-SMART 分类" data-shape="PS-SMART" data-type="node"
          data-size="170*34">
      <img src={componentImgUrl} className={styles.typeImg}/>PS-SMART 分类
    </span>,
    <span className={`${styles.item} getItem`} data-name="读数据表" data-shape="read-data-table" data-type="node"
          data-size="170*34">
      <img src={componentImgUrl} className={styles.typeImg}/>读数据表
    </span>,
    <span className={`${styles.item} getItem`} data-name="朴素贝叶斯" data-shape="Bayes" data-type="node" data-size="170*34">
      <img src={componentImgUrl} className={styles.typeImg}/>朴素贝叶斯
    </span>,

  ];

  renderTree = (component) => {
    if (component.isChild) {
      const item = (
        <span className={`${styles.item} getItem`} data-name={component.name} data-shape={component.type}
              data-nodeid={component.id}
              data-type="node"
              data-size="170*34">
                    <img src={componentImgUrl} className={styles.typeImg}/>{component.name}
                </span>);
      return (
        <TreeNode className={styles.leaf} title={item} key={component.id}/>);
    } else {
      return (
        <TreeNode className={styles.parent} title={component.name} key={component.id}>
          {
            component.children.map((child) => {
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
        // defaultExpandAll
        // showIcon={true}
        onSelect={this.onSelect}
        onExpand={this.onExpand}
        className={styles.container}
      >
        {
          components.map((component) => {
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
