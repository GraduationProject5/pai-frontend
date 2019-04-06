import React from 'react';
import {Form, Icon, Input, Select, Row, Col, Checkbox, Tabs} from 'antd';
import {connect} from 'dva';
import styles from "./CreateTable.scss";
import {checkTokenVaild, sendToken} from "../../../../../../services/UserService";
import * as DataService from "../../../../../../services/DataService";

const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const TextArea = Input.TextArea;

class CreateTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tableName: '',    // 表名
      description: '',  // 描述
      mode: 'field',    // 建表方式，默认为可视化建表，命令行建表为 field
    };
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  remove = (k) => {
    const {form} = this.props;
    const tableFieldKeys = form.getFieldValue('tableFieldKeys');
    if (tableFieldKeys.length === 0) {
      form.setFieldsValue({
        tableStructure: null
      });
      return;
    }
    form.setFieldsValue({
      tableFieldKeys: tableFieldKeys.filter(key => key !== k),
    });
  };

  add = () => {
    const {form} = this.props;
    const tableFieldKeys = form.getFieldValue('tableFieldKeys');
    const newKeys = tableFieldKeys.concat(tableFieldKeys.length);
    form.setFieldsValue({
      tableFieldKeys: newKeys,
      tableStructure: {}
    });
  };

  clear = () => {
    this.props.form.resetFields();
  };

  validate = () => {
    let isValidated = false;
    const mode = this.state.mode;

    if (mode === 'field') {
      this.props.form.validateFields(['tableName', 'description', 'tableStructure', 'tableFields'], (err, values) => {
        if (!err) {
          this.props.changeTableName(values.tableName);
          isValidated = true;
        }
      });
      return isValidated;
    } else {
      this.props.form.validateFields(['tableName', 'script'], (err, values) => {
        if (!err) {
          // TODO 此时后台如何获取表名
          // this.props.changeTableName(values.tableName);
          isValidated = true;
        }
      });
      return isValidated;
    }
  };

  handleColumns = (tableFields) => {
    const columnMap = {};
    tableFields.map((tableField, index) => {
      if (tableField.primary) {
        tableField.description = 'NOT NULL PRIMARY KEY'
      } else if (tableField.notNull) {
        tableField.description = 'NOT NULL'
      } else {
        tableField.description = '';
      }
      delete tableField.primary;
      delete tableField.notNull;
      columnMap[index] = tableField;
    });

    return columnMap;
  };

  submit = async () => {
    if (this.state.mode === 'field') {
      return await new Promise((resolve, reject) => {
        this.props.form.validateFields(['tableName', 'description', 'tableStructure', 'tableFields'], async (err, values) => {
          if (!err) {
            const columnMap = this.handleColumns(values.tableFields);
            const data = {
              tableName: values.tableName,
              description: values.description,
              requestBody: columnMap
            };
            if (checkTokenVaild()) {
              const response = await sendToken(DataService.createTableByColumn, data);
              resolve(!!(response && response.result));
            } else {
              this.props.dispatch({
                type: 'user/saveLoginModalVisible',
                payload: {
                  loginModalVisible: true,
                },
              });
              resolve(false);
            }
          } else resolve(false);
        });
      });
    } else {
      return await new Promise((resolve, reject) => {
        this.props.form.validateFields(['tableName', 'script'], async (err, values) => {
          if (!err) {
            const data = {
              tableName: values.tableName,
              sql: values.script,
            };
            if (checkTokenVaild()) {
              const response = await sendToken(DataService.createTableByScript, data);
              console.log("createTableByScript", response);
              resolve(!!(response && response.result));
            } else {
              this.props.dispatch({
                type: 'user/saveLoginModalVisible',
                payload: {
                  loginModalVisible: true,
                },
              });
              resolve(false);
            }
          } else resolve(false);
        });
      });
    }
  };


  handleCheckFields = (rule, value, callback) => {
    const {form} = this.props;
    const tableFieldKeys = form.getFieldValue('tableFieldKeys');
    if (tableFieldKeys.length === 0) {
      callback("列不能为空");
    }
    callback();
  };

  handleTabChange = (key) => {
    this.setState({
      mode: key
    })
  };

  render() {
    const {getFieldDecorator, getFieldValue} = this.props.form;

    getFieldDecorator('tableFieldKeys', {initialValue: []});
    const tableFieldKeys = getFieldValue('tableFieldKeys');
    const tableFields = tableFieldKeys.map((tableFieldKey, index) => (
      <FormItem
        required={false}
        key={tableFieldKey}
      >
        <Row gutter={24} type="flex" align="middle">
          <Col span={11}>
            {getFieldDecorator(`tableFields[${tableFieldKey}].columnName`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                required: true,
                whitespace: true,
                message: "请输入列名",
              }],
            })(
              <Input placeholder="请输入列名"/>
            )}
          </Col>
          <Col span={5}>
            {getFieldDecorator(`tableFields[${tableFieldKey}].columnType`, {
              validateTrigger: ['onChange', 'onBlur'],
              initialValue: "INT",
            })(
              <Select
                size="small"
              >
                <Option value="INT">int</Option>
                <Option value="BIGINT">bigint</Option>
                <Option value="DOUBLE">double</Option>
                <Option value="DECIMAL">decimal</Option>
                <Option value="STRING">string</Option>
                <Option value="BOOLEAN">boolean</Option>
                <Option value="DATETIME">datetime</Option>
              </Select>
            )}
          </Col>
          <Col span={3} style={{textAlign: 'center'}}>
            {getFieldDecorator(`tableFields[${tableFieldKey}].primary`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                message: "主键",
                type: 'boolean'
              }],
            })(
              <Checkbox/>
            )}
          </Col>
          <Col span={3} style={{textAlign: 'center'}}>
            {getFieldDecorator(`tableFields[${tableFieldKey}].notNull`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                message: "非空",
                type: 'boolean'
              }],
            })(
              <Checkbox/>
            )}
          </Col>
          <Col span={2}>
            {tableFieldKeys.length >= 0 ? (
              <Icon
                className={styles.iconBtn}
                style={{color: '#ff6666'}}
                type="close-circle"
                disabled={tableFieldKeys.length === 0}
                onClick={() => this.remove(tableFieldKey)}
              />
            ) : null}
          </Col>
        </Row>
      </FormItem>
    ));

    const createTableByFields =
      <Form className={styles.form} layout="vertical">
        <FormItem label="表名">
          {getFieldDecorator('tableName', {
            rules: [{required: true, message: '请输入表名'}],
          })(
            <Input placeholder="请输入表名"/>,
          )}
        </FormItem>
        <FormItem label="描述">
          {getFieldDecorator('description', {
            rules: [{required: true, message: '请输入描述'}],
          })(
            <Input placeholder="请输入描述"/>,
          )}
        </FormItem>
        <FormItem label="表结构" style={{width: '100%'}}>
          {getFieldDecorator('tableStructure', {
            rules: [{required: true, message: '列不能为空', validator: this.handleCheckFields}],
          })(
            <Row gutter={24}>
              <Col span={11}>
                <span>列名</span>
              </Col>
              <Col span={5} style={{textAlign: 'left'}}>
                <span>类型</span>
              </Col>
              <Col span={3} style={{textAlign: 'left'}}>
                <span>主键</span>
              </Col>
              <Col span={3} style={{textAlign: 'left'}}>
                <span>非空</span>
              </Col>
              <Col span={2}>
                <Icon type="plus-circle" onClick={this.add} style={{color: '#34bf49'}} className={styles.iconBtn}/>
              </Col>
            </Row>
          )}
        </FormItem>
        {tableFields}
      </Form>;

    const createTableByScript =
      <Form className={styles.form} layout="vertical">
        <FormItem label="表名">
          {getFieldDecorator('tableName', {
            rules: [{required: true, message: '请输入表名'}],
          })(
            <Input placeholder="请输入表名"/>,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('script', {
            rules: [{required: true, message: '请输入脚本命令'}],
          })(
            <TextArea rows={12}/>
          )}
        </FormItem>
      </Form>;

    return (
      <Tabs defaultActiveKey="field" onChange={this.handleTabChange} style={this.props.style}>
        <TabPane tab="可视化建表" key="field">{createTableByFields}</TabPane>
        <TabPane tab="命令行建表" key="script">{createTableByScript}</TabPane>
      </Tabs>
    );
  }
}

const WrappedNormalForm = Form.create()(CreateTable);
WrappedNormalForm.propTypes = {};

export default connect()(WrappedNormalForm);
