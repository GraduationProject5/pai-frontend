import React from 'react';
import {Modal, Button, Form, Upload, Icon, Input, message} from 'antd';
import {connect} from 'dva';
import styles from "./PictureUpload.scss";
import {sendToken} from "../../../../../services/UserService";
import {createTrainDir, uploadPic} from "../../../../../services/DataService";

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
        console.log("handleSubmit", values, this.props.experiment);
        const trainDirData= {
          expName: this.props.experiment.experimentName,
          dirName: values.dirName
        };
        console.log("trainDirData", trainDirData);
        sendToken(createTrainDir, trainDirData).then(response => {
          console.log("createTrainDir response", response);
          if (response && response.result) {
            const pics = values.pictures.fileList.map(file => file.originFileObj);
            const uploadData = {
              expName: this.props.experiment.experimentName,
              dirName: values.dirName,
              pics: pics
            };
            console.log("uploadData", uploadData);
            sendToken(uploadPic, uploadData).then(response => {
              if (response && response.result) {
                message.success('上传图片成功');
                this.props.form.resetFields();
                this.setState({
                  visible: false,
                })
              } else {
                message.error('上传图片失败');
              }
            })
          } else {
            message.error('创建训练集文件失败');
          }
        }).catch(err => {
          console.error(err);
          message.error('创建图片源失败');
        });
      }
    });
  };

  handleCreatePicture = () => {
    this.setState({
      visible: true,
    });
  };

  uploadProps = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
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
