import React from 'react';
import {Form, Icon, Input, Select, Row, Col, Checkbox} from 'antd';
import styles from "./CreateTable.scss";

const FormItem = Form.Item;
const Option = Select.Option;

class CreateTable extends React.Component {
  remove = (k) => {
    const {form} = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const {form} = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(keys.length);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  render() {
    const {getFieldDecorator, getFieldValue} = this.props.form;
    getFieldDecorator('keys', {initialValue: [0]});
    const keys = getFieldValue('keys');
    const tableCols = keys.map((k, index) => (
      <FormItem
        required={false}
        key={k}
      >
        <Row gutter={24} type="flex" align="middle">
          <Col span={12}>
            {getFieldDecorator(`names[${k}]`, {
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
            {getFieldDecorator(`names[${k}]`, {
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
            {getFieldDecorator(`names[${k}]`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                message: "Please input passenger's name or delete this field.",
              }],
            })(
              <Checkbox />
            )}
          </Col>
          <Col span={2}>
            {keys.length >= 1 ? (
              <Icon
                className={styles.iconBtn}
                style={{color: '#ff6666'}}
                type="close-circle"
                disabled={keys.length === 1}
                onClick={() => this.remove(k)}
              />
            ) : null}
          </Col>
        </Row>
      </FormItem>
    ));
    return (
      <Form onSubmit={this.handleSubmit} className={styles.form} layout="vertical">
        <FormItem label="表名">
          {getFieldDecorator('tablename', {
            rules: [{required: true, message: '请输入表名'}],
          })(
            <Input placeholder="请输入表名"/>,
          )}
        </FormItem>
        <FormItem label="表结构" style={{width: '100%'}}>
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
        </FormItem>
        {tableCols}
      </Form>
    );
  }
}

const WrappedNormalForm = Form.create()(CreateTable);
WrappedNormalForm.propTypes = {};

export default WrappedNormalForm;
