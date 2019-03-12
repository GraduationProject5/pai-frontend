import React from 'react';
import {Form, Button, message, Upload, Icon, Row, Col, Input} from 'antd';
import styles from './UploadData.scss'

const FormItem = Form.Item;

class UploadData extends React.Component {

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const props = {
      name: 'file',
      action: '//jsonplaceholder.typicode.com/posts/',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    return (
      <div className={styles.container}>
        <div className={styles.hint}>
          注意：上传的数据将追加到原表，请上传 .csv 文件
        </div>
        <Upload {...props} className={styles.upload}>
          <Button type="primary" className={styles.uploadBtn}>
            <Icon type="upload" />选择文件
          </Button>
        </Upload>
        <Form onSubmit={this.handleSubmit} className={styles.form} layout="vertical">
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="行分隔符">
                {getFieldDecorator('rowSepChar', {
                  rules: [{required: true, message: '请输入行分隔符'}],
                })(
                  <Input placeholder="请输入行分隔符"/>,
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="列分隔符">
                {getFieldDecorator('colSepChar', {
                  rules: [{required: true, message: '请输入列分隔符'}],
                })(
                  <Input placeholder="请输入列分隔符"/>,
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const WrappedNormalForm = Form.create()(UploadData);
WrappedNormalForm.propTypes = {};

export default WrappedNormalForm;
