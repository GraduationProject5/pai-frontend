import React from 'react';
import { Menu, Button } from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
import styles from './Header.scss';
import defaultAvatar from '../../assets/img/default-avatar.png';
import LoginModal from '../../components/LoginModal/LoginModal';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'login',
    };
  }

  setLoginModalVisible = (visible, mode) => {
    this.props.dispatch({
      type: 'user/saveLoginModalVisible',
      payload: {
        loginModalVisible: visible,
      },
    });
    this.setState({ mode });
  };

  handleLogout = () => {
    this.props.dispatch({
      type: 'user/logout',
    });
  };

  render() {
    const { location, userInfo } = this.props;
    return (
      <div className={styles.header}>
        <Menu
          selectedKeys={[location.pathname]}
          mode="horizontal"
          className={styles.menu}
        >
          <MenuItem key="/">
            <Link to="/">
              首页
            </Link>
          </MenuItem>
          <MenuItem key="/experiment">
            <Link to="/experiment">
              实验
            </Link>
          </MenuItem>
        </Menu>
        <div className={styles.right}>
          <Menu
            mode="horizontal"
            className={styles.menu}
          >
            {
              userInfo ?
                <SubMenu
                  key="avatar"
                  title={<a>
                    <img alt="avatar" src={defaultAvatar} className={styles.avatar} />
                  </a>}
                  className={styles.submenu}
                >
                  <MenuItem key="logout">
                    <div onClick={this.handleLogout}>注销</div>
                  </MenuItem>
                </SubMenu>
                : null
            }
          </Menu>
          {
            userInfo ?
              null
              :
              <div className={styles.action_button}>
                <Button className={styles.login_button} onClick={() => this.setLoginModalVisible(true, 'login')}>
                  登录
                </Button>
                <Button
                  type="primary" className={styles.upload_button}
                  onClick={() => this.setLoginModalVisible(true, 'register')}
                >
                  注册
                </Button>
              </div>
          }
        </div>
        <LoginModal
          visible={this.props.loginModalVisible} setModalVisible={this.setLoginModalVisible}
          mode={this.state.mode}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { userInfo, loginModalVisible } = state.user;
  return { userInfo, loginModalVisible };
}

export default connect(mapStateToProps)(Header);
