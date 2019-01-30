import React from 'react';
import {Menu, Icon} from 'antd';
import styles from './index.scss';
import Home from './Home/Home';
import Detail from './Detail/Detail';
import Setting from './Setting/Setting';

class Index extends React.Component {

  module = {
    home: <Home />,
    setting: <Setting />
  };

  constructor(props) {
    super(props);
    this.state = {
      isDetail: false,
      detailMode: "experiment",
      content: this.module["home"]
    }
  }

  changeContent(type, isDetail) {
    if (isDetail) {
      this.setState({
        isDetail: true,
        detailMode: type
      });
    } else {

      this.setState({
        isDetail: false,
        content: this.module[type]
      })
    }
  }

  render() {
    const { content, isDetail, detailMode } = this.state;
    return (
      <div className={styles.container}>
        <Menu
          style={{height: '100%'}}
          defaultSelectedKeys={['home']}
          mode="inline"
          theme="dark"
          inlineCollapsed={true}
        >
          <Menu.Item key="home" onClick={this.changeContent.bind(this, 'home', false)}>
            <Icon type="home"/>
            <span>首页</span>
          </Menu.Item>
          <Menu.Item key="experiment" onClick={this.changeContent.bind(this, 'experiment', true)}>
            <Icon type="experiment"/>
            <span>实验</span>
          </Menu.Item>
          <Menu.Item key="database" onClick={this.changeContent.bind(this, 'database', true)}>
            <Icon type="database"/>
            <span>数据源</span>
          </Menu.Item>
          <Menu.Item key="component" onClick={this.changeContent.bind(this, 'component', true)}>
            <Icon type="api"/>
            <span>组件</span>
          </Menu.Item>
          <Menu.Item key="model" onClick={this.changeContent.bind(this, 'model', true)}>
            <Icon type="deployment-unit"/>
            <span>模型</span>
          </Menu.Item>
          <Menu.Item key="setting" onClick={this.changeContent.bind(this, 'setting', false)}>
            <Icon type="setting"/>
            <span>设置</span>
          </Menu.Item>
        </Menu>
        <div className={styles.content}>
          {
            isDetail ? <Detail mode={detailMode} /> : content
          }
        </div>
      </div>
    );
  }
}

export default Index;
