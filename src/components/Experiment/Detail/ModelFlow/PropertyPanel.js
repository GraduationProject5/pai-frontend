import React from 'react';
import G6Editor from '@antv/g6-editor';
import PropTypes from 'prop-types';
import {Input, Tabs} from 'antd';
import {connect} from 'dva';
import styles from './PropertyPanel.scss';
import {saveSettingsForNode} from "../../../../services/ComponentService";
import {sendToken} from "../../../../services/UserService";
import {updateExperimentInfo} from "../../../../services/ExperimentService";

const TextArea = Input.TextArea;
const TabPane = Tabs.TabPane;

class PropertyPanel extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      name: '',   // 实验名称
      desc: '',   // 实验描述
      settings: {},  // 组件参数
    }
  }

  componentDidMount() {
    const {editor} = this.props;
    const propertyPanel = this.createPropertyPanel(this.propertyPanelContainer);
    editor.add(propertyPanel);
    this.setState({
      name: this.props.experimentDetail.experimentName,
      desc: this.props.experimentDetail.description
    });
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

    if (this.props.selectedModel !== nextProps.selectedModel) {
      const model = nextProps.selectedModel;
      if (model && model.settings) {
        this.setState({
          settings: JSON.parse(model.settings)
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
    INFO: 1,
    SETTINGS: 2
  };

  changeExperimentInfo = () => {
    const data = {
      experimentId: this.props.experimentDetail.experimentID,
      requestBody: {
        experimentName: this.state.name,
        description: this.state.desc
      }
    };
    sendToken(updateExperimentInfo, data);
  };

  changeComponentSettings = () => {
    const data = {
      nodeID: +this.props.selectedModel.nodeid,
      settings: this.state.settings
    };
    sendToken(saveSettingsForNode, data);
  };

  inputDebounce = (func, delay) => {
    return (args) => {
      clearTimeout(func.timeoutId);
      func.timeoutId = setTimeout(() => {
        func.call(this, args);
      }, delay)
    }
  };

  changeInfo = this.inputDebounce(this.changeExperimentInfo, 3000);
  changeSettings = this.inputDebounce(this.changeComponentSettings, 3000);

  handleInputChange = (e, type, key) => {
    const value = e.target.value;
    if (type === this.INPUT_TYPE.INFO) {
      this.setState({
        [key]: value
      }, () => {
        this.changeInfo();
      });
    } else if (type === this.INPUT_TYPE.SETTINGS) {
      this.setState(prevState => {
        return {
          settings: {
            ...(prevState.settings),
            [key]: value
          }
        };
      }, () => {
        this.changeSettings()
      });
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
    const tableDetail = this.props.tableDetail;
    return (
      <Tabs defaultActiveKey="table" onChange={(key) => this.handleTableTabChange(key, model.name)}>
        <TabPane tab="表选择" key="table" className={styles.propertyContent}>
          <div className={styles.inputItem}>
            <div className={styles.key}>表名</div>
            <div className={styles.key}>{model.name}</div>
          </div>
          <div className={styles.inputItem}>
            <div className={styles.key}>描述</div>
            <div className={styles.key}>{model.desc}</div>
          </div>
        </TabPane>
        <TabPane tab="字段信息" key="column" className={styles.propertyContent}>
          <table className={styles.table}>
            <thead>
            <tr>
              <td>字段</td>
              <td>类型</td>
            </tr>
            </thead>
            <tbody>
            {
              tableDetail && tableDetail.columnVOList && tableDetail.columnVOList.map((column, index) => {
                return (
                  <tr key={index}>
                    <td>{column.columnName}</td>
                    <td>{column.columnType}</td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
        </TabPane>
      </Tabs>
    );
  };

  renderComponentProperty = () => {
    let settings = this.state.settings;
    return (
      <React.Fragment>
        <h3>参数设置</h3>
        <div className={styles.propertyContent}>
          {
            settings && Object.keys(settings).map((key, index) => {
              return (
                <div className={styles.inputItem} key={key}>
                  <div className={styles.key}>{key}</div>
                  <Input value={settings[key]}
                         onChange={(e) => this.handleInputChange(e, this.INPUT_TYPE.SETTINGS, key)}/>
                </div>
              )
            })
          }
        </div>
      </React.Fragment>
    );
  };

  renderExperimentProperty = () => {
    const {name, desc} = this.state;
    return (
      <React.Fragment>
        <h3>实验属性</h3>
        <div className={styles.propertyContent}>
          <div className={styles.inputItem}>
            <div className={styles.key}>名称</div>
            <Input value={name} onChange={(e) => this.handleInputChange(e, this.INPUT_TYPE.INFO, 'name')}/>
          </div>
          <div className={styles.inputItem}>
            <div className={styles.key}>描述</div>
            <TextArea rows={4} value={desc}
                      onChange={(e) => this.handleInputChange(e, this.INPUT_TYPE.INFO, 'desc')}/>
          </div>
        </div>
      </React.Fragment>
    )
  };

  render() {
    const {selectedModel, className} = this.props;
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
          {this.renderExperimentProperty()}
        </div>
      </div>);
  }
}

function mapStateToProps(state) {
  const {experimentDetail} = state.experiment;
  const {tableDetail} = state.data;
  return {experimentDetail, tableDetail};
}

PropertyPanel.propTypes = {
  editor: PropTypes.object,
  selectedModel: PropTypes.object
};

export default connect(mapStateToProps)(PropertyPanel);
