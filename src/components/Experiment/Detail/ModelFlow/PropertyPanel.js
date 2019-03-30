import React from 'react';
import G6Editor from '@antv/g6-editor';
import PropTypes from 'prop-types';
import {Input, Tabs} from 'antd';
import {connect} from 'dva';
import styles from './PropertyPanel.scss';

const TextArea = Input.TextArea;
const TabPane = Tabs.TabPane;

class PropertyPanel extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      name: '',
      desc: ''
    }
  }

  componentDidMount() {
    const {editor} = this.props;
    const propertyPanel = this.createPropertyPanel(this.propertyPanelContainer);
    editor.add(propertyPanel);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.experimentDetail !== nextProps.experimentDetail) {
      if (nextProps.experimentDetail) {
        this.setState({
          name: nextProps.experimentDetail.experimentName,
          desc: nextProps.experimentDetail.description
        });
      }
    }
  }

  createPropertyPanel(container) {
    return new G6Editor.Detailpannel({
      container
    });
  }

  INPUT_TYPE = {
    NAME: 1,
    DESC: 2
  };

  changeExperimentName = () => {
    console.log("change name")
  };

  changeExperimentDesc = () => {
    console.log("change desc");
  };

  inputDebounce = (func, delay) => {
    return (args) => {
      clearTimeout(func.timeoutId);
      func.timeoutId = setTimeout(() => {
        func.call(this, args);
      }, delay)
    }
  };

  changeName = this.inputDebounce(this.changeExperimentName, 1000);
  changeDesc = this.inputDebounce(this.changeExperimentDesc, 1000);

  handleInputChange = (e, type) => {
    if (type === this.INPUT_TYPE.NAME) {
      this.setState({
        name: e.target.value
      });
      this.changeName(e.target.value);
    } else if (type === this.INPUT_TYPE.DESC) {
      this.setState({
        desc: e.target.value
      });
      this.changeDesc(e.target.value);
    }
  };

  handleTableTabChange = (key, tableName) => {
    if (key === 'column') {
      this.props.dispatch({
        type: 'data/getTableDetail',
        payload: {
          tableName: tableName
        }
      });
    }
  };

  renderTableProperty = (model) => {
    return (
      <Tabs defaultActiveKey="table" onChange={(key) => this.handleTableTabChange(key, model.name)}>
        <TabPane tab="表选择" key="table" className={styles.propertyContent}>
          <div className={styles.inputItem}>
            <div className={styles.key}>表名</div>
            <div className={styles.key}>{model.name}</div>
          </div>
        </TabPane>
        <TabPane tab="字段信息" key="column" className={styles.propertyContent}>
          <div className={styles.inputItem}>

          </div>
        </TabPane>
      </Tabs>
    );
  };

  renderComponentProperty = (model) => {
    let paras = model && model.paras;
    if (paras) paras = JSON.parse(paras);
    console.log('组件参数', paras);
    return (
      <React.Fragment>
        <h3>参数设置</h3>
        <div className={styles.propertyContent}>
          {
            paras && Object.keys(paras).map((key, index) => {
              return (
                <div className={styles.inputItem} key={index}>
                  <div className={styles.key}>{key}</div>
                  <Input value={paras[key]} onChange={(e) => this.handleInputChange(e, this.INPUT_TYPE.NAME)}/>
                </div>
              )
            })
          }
        </div>
      </React.Fragment>
    );
  };

  render() {
    const {selectedModel, className} = this.props;
    const {name, desc} = this.state;
    let kind = selectedModel && selectedModel.kind;
    let renderProperty;
    if (kind === 'component') {
      renderProperty = this.renderComponentProperty;
    } else if (kind === 'table') {
      renderProperty = this.renderTableProperty;
    } else {
      renderProperty = null;
    }

    return (
      <div className={`${styles.container} ${className}`} ref={el => {
        this.propertyPanelContainer = el;
      }}>
        <div data-status="node-selected" className={`${styles.property} pannel`}>
          {renderProperty && renderProperty(selectedModel)}
        </div>
        <div data-status="canvas-selected" className={`${styles.property} pannel`}>
          <h3>实验属性</h3>
          <div className={styles.propertyContent}>
            <div className={styles.item}>
              <span className={styles.key}>创建日期</span>
              <span className={styles.value}>2019-1-31 21:05:18</span>
            </div>
            <div className={styles.inputItem}>
              <div className={styles.key}>名称</div>
              <Input value={name} onChange={(e) => this.handleInputChange(e, this.INPUT_TYPE.NAME)}/>
            </div>
            <div className={styles.inputItem}>
              <div className={styles.key}>描述</div>
              <TextArea rows={4} value={desc}
                        onChange={(e) => this.handleInputChange(e, this.INPUT_TYPE.DESC)}/>
            </div>
          </div>
        </div>
      </div>);
  }
}

function mapStateToProps(state) {
  const {experimentDetail} = state.experiment;
  const { tableDetail} = state.data;
  return {experimentDetail, tableDetail};
}

PropertyPanel.propTypes = {
  editor: PropTypes.object,
  selectedModel: PropTypes.object
};

export default connect(mapStateToProps)(PropertyPanel);
