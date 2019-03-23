import React from 'react';
import {Form, Icon, Input, Select, Row, Col, Checkbox, Tabs} from 'antd';
import {connect} from 'dva';
import styles from "./CreateTable.scss";

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
      script: '',       // 命令行脚本
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
      this.props.form.validateFields(['script'], (err, values) => {
        if (!err) {
          // TODO 此时后台如何获取表名
          // this.props.changeTableName(values.tableName);
          isValidated = true;
        }
      });
      return isValidated;
    }
  };

  submit = () => {
    console.log("submit");
    this.props.form.validateFields((err, values) => {
      console.log("err", err);
      console.log("CreateTable", values);
      if (!err) {
        const data = {
          tableName: values.tableName,
          description: values.description,
          columnList: values.columnList
        };
        this.props.dispatch({
          type: 'data/createTableByColumn',
          payload: data,
        });
      }
    });
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

  handleTextAreaChange = (e) => {
    this.setState({
      script: e.target.value
    })
  };

  render() {
    const {getFieldDecorator, getFieldValue} = this.props.form;
    const {script} = this.state.script;

    getFieldDecorator('tableFieldKeys', {initialValue: []});
    const tableFieldKeys = getFieldValue('tableFieldKeys');
    const tableFields = tableFieldKeys.map((tableFieldKey, index) => (
      <FormItem
        required={false}
        key={tableFieldKey}
      >
        <Row gutter={24} type="flex" align="middle">
          <Col span={12}>
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
              initialValue: "bigint",
            })(
              <Select
                size="small"
              >
                <Option value="bigint">bigint</Option>
                <Option value="double">double</Option>
                <Option value="decimal">decimal</Option>
                <Option value="string">string</Option>
                <Option value="boolean">boolean</Option>
                <Option value="datetime">datetime</Option>
              </Select>
            )}
          </Col>
          <Col span={5} style={{textAlign: 'center'}}>
            {getFieldDecorator(`tableFields[${tableFieldKey}].split`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                message: "是否分区字段",
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
              <Col span={12}>
                <span>列名</span>
              </Col>
              <Col span={5} style={{textAlign: 'left'}}>
                <span>类型</span>
              </Col>
              <Col span={5} style={{textAlign: 'left'}}>
                <span>是否分区字段</span>
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
