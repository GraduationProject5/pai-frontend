import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './page.scss';
import IndexImage from '../assets/img/index.jpg';
import MainLayout from '../components/MainLayout/MainLayout';

class IndexPage extends React.Component {

  handleStart = () => {
    const userInfo = this.props.userInfo;

    if (userInfo) {
      this.props.dispatch(routerRedux.push('/experiment'));
    } else {
      this.props.dispatch({
        type: 'user/saveLoginModalVisible',
        payload: {
          loginModalVisible: true,
        },
      });
    }
  };

  render() {
    const location = this.props.location;

    return (
      <MainLayout location={location}>
        <div className={styles.index}>
          <img alt="index" src={IndexImage} />
          <div className={styles.welcome}>PMLS 机器学习服务平台</div>
          <Button type="primary" className={styles.form_button} onClick={this.handleStart}>
            立即体验
          </Button>
        </div>
      </MainLayout>
    );
  }
}

function mapStateToProps(state) {
  const { userInfo } = state.user;
  return { userInfo };
}


export default connect(mapStateToProps)(IndexPage);
