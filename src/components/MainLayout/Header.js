import React from 'react';
import { Menu, Button, Icon } from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
import SearchBar from './SearchBar';
import styles from './Header.scss';
import defaultAvatar from '../../assets/img/default-avatar.png';
import LoginModal from '../../components/LoginModal/LoginModal';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
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
    console.log('退出登录');
    this.props.dispatch({
      type: 'user/logout',
    });
  };

  render() {
    const { location, userInfo } = this.props;
    console.log('Header, userInfo:', userInfo);
    return (
      <div className={styles.header}>
        <Menu
          selectedKeys={[location.pathname]}
          mode="horizontal"
          className={styles.menu}
        >
          <MenuItem key="/">
            <Link to="/">
              HOME
            </Link>
          </MenuItem>
          <MenuItem key="/follow">
            <Link to="/follow">
              FOLLOW
            </Link>
          </MenuItem>
          <MenuItem key="/activity">
            <Link to="/activity">
               ACTIVITY
             </Link>
          </MenuItem>
          <MenuItem key="/liked">
            <Link to="/liked">
              LIKED
            </Link>
          </MenuItem>
          <MenuItem key="/message">
            <Link to="/message">
              MESSAGE
            </Link>
          </MenuItem>
        </Menu>
        <div className={styles.right}>
          <div className={styles.search_bar}>
            <SearchBar />
          </div>
          <Menu
            selectedKeys={[location.pathname]}
            mode="horizontal"
            className={styles.menu}
          >
            {
              userInfo ?
                <SubMenu
                  key="avatar"
                  title={<a>
                    <img alt="avatar" src={userInfo.avatar ? `/api/${userInfo.avatar}` : defaultAvatar} className={styles.avatar} />
                  </a>}
                  className={styles.submenu}
                >
                  <MenuItemGroup>
                    <MenuItem key="profile">
                      <Link to={`/user/${userInfo.userId}`}>
                        My profile
                      </Link>
                    </MenuItem>
                    <MenuItem key="logout">
                      <a onClick={this.handleLogout}>Logout</a>
                    </MenuItem>
                  </MenuItemGroup>
                </SubMenu>
                : null
            }
          </Menu>
          {
            userInfo ?
              <Button type="primary" className={styles.upload_button} onClick={() => this.setUploadModalVisible(true)}>
                <Icon type="cloud-upload-o" style={{ fontSize: 18 }} />Upload
              </Button>
              :
              <div className={styles.action_button}>
                <Button className={styles.login_button} onClick={() => this.setLoginModalVisible(true, 'login')}>Log
                  in</Button>
                <Button
                  type="primary" className={styles.upload_button}
                  onClick={() => this.setLoginModalVisible(true, 'register')}
                >
                  Join free
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
