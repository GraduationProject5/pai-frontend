import React from 'react';
import {Modal, Button, Form, Upload, Icon, Input} from 'antd';
import {connect} from 'dva';
import styles from "./PictureUpload.scss";

const FormItem = Form.Item;

class PictureUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
  }

  cancel = () => {
    // 清空表单数据
    this.props.form.resetFields();
    this.setState({
      visible: false,
    });
  };

  handleDirChange = (value) => {

  };

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("handleSubmit", values)
      }
    });
  };

  handleCreatePicture = () => {
    this.setState({
      visible: true,
    });
  };

  uploadProps = {
    name: 'dataFile',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
      authorization: 'authorization-text',
    },
    onChange: (value) => {
      console.log("handleDirChange", value);
      // if (file && file.name.indexOf(".csv") !== -1) {
      //   if (file.status === 'done') {
      //     console.log("onChange", file);
      //     this.setState({
      //       dataFile: file,
      //       fileList
      //     });
      //   } else if (file.status === 'error') {
      //     message.error("上传文件失败");
      //   } else {
      //     this.setState({
      //       fileList
      //     });
      //   }
      // } else {
      //   this.setState({fileList: []})
      // }
    },
    directory: true
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {visible} = this.state;

    return (
      <div className={styles.container}>
        <Button onClick={() => this.handleCreatePicture()} type="primary">创建图片源</Button>
        <Modal
          title="运行实验"
          visible={visible}
          width={600}
          centered
          okText="确定"
          cancelText="取消"
          onOk={this.handleSubmit}
          onCancel={this.cancel}
        >
          <Form>
            <FormItem label="文件夹名">
              {getFieldDecorator('dirName', {
                rules: [{required: true, message: '请输入文件夹名'}],
              })(
                <Input placeholder="请输入文件夹名"/>,
              )}
            </FormItem>
            <FormItem label="选择图片文件夹">
              {getFieldDecorator('pictures', {
                rules: [{required: true, message: '请选择图片文件夹'}],
              })(
                <Upload {...this.uploadProps}>
                  <Button>
                    <Icon type="upload" />选择文件夹
                  </Button>
                </Upload>
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default connect()(Form.create()(PictureUpload));
