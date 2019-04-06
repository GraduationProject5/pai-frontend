import React from 'react';
import {Form, Button, message, Upload, Icon, Row, Col, Input} from 'antd';
import styles from './UploadData.scss'
import {sendToken} from "../../../../../../services/UserService";
import {uploadData} from "../../../../../../services/DataService";

const FormItem = Form.Item;

class UploadData extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataFile: '',
      fileList: []
    };
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  uploadProps = {
    name: 'dataFile',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
      authorization: 'authorization-text',
    },
    onChange: ({file, fileList}) => {
      if (file && file.name.indexOf(".csv") !== -1) {
        if (file.status === 'done') {
          console.log("onChange", file);
          this.setState({
            dataFile: file,
            fileList
          });
        } else if (file.status === 'error') {
          message.error("上传文件失败");
        } else {
          this.setState({
            fileList
          });
        }
      } else {
        this.setState({fileList: []})
      }
    },
    beforeUpload: (file) => {
      if (file && file.name.indexOf(".csv") !== -1) {
        return true;
      } else {
        message.error("文件格式要求为 csv！");
        return false;
      }
    }
  };

  clear = () => {
    this.props.form.resetFields();
  };

  validate = () => {
    let isValidated = false;
    this.props.form.validateFields((err, values) => {
      isValidated = !err;
    });
    return isValidated;
  };

  submit = async () => {
    return await new Promise(resolve => {
      this.props.form.validateFields((err, values) => {
        console.log("err", err);
        console.log("UploadData values", values);
        if (!err) {
          const data = {
            tableName: this.props.tableName,
            file: this.state.dataFile,
            rowSepChar: values.rowSepChar,
            colSepChar: values.colSepChar
          };
          sendToken(uploadData, data).then(response => {
            console.log("UploadData response", response);
            resolve(!!(response && response.result));
          }).catch(err => {
            resolve(false);
          });
        } else {
          resolve(false);
        }
      });
    });
  };

  handleCheckFile = (rule, value, callback) => {
    if (!value || (value.fileList && this.state.fileList.length === 0)) {
      callback("请选择文件");
    }
    callback();
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {fileList} = this.state;

    return (
      <Form className={styles.container} layout="vertical" style={this.props.style}>
        <FormItem>
          <div className={styles.hint}>
            注意：上传的数据将追加到原表，请上传 .csv 文件
          </div>
          {getFieldDecorator('upload', {
            rules: [{required: true, message: '请选择文件', validator: this.handleCheckFile}],
          })(
            <Upload {...this.uploadProps} fileList={fileList} className={styles.upload}>
              <Button type="primary" className={styles.uploadBtn}>
                <Icon type="upload"/>选择文件
              </Button>
            </Upload>
          )}
        </FormItem>
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
    );
  }
}

const WrappedNormalForm = Form.create()(UploadData);
WrappedNormalForm.propTypes = {};

export default WrappedNormalForm;
