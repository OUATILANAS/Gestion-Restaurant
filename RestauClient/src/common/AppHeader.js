import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './AppHeader.css';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { HomeOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import "../Styles/main.css";
const { Header } = Layout;

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick({ key }) {
    if (key === 'logout') {
      this.props.onLogout();
    }
  }

  render() {
    const { currentUser } = this.props;

    const menuItems = currentUser
      ? [
        <Link to="/citylist" style={{ color: 'white', marginRight: '10px' }}>
        <HomeOutlined className="menu-item-icon" />
        Home
      </Link>,
      <Link to="/citylist" style={{ color: 'white', marginRight: '10px' }}>
        <HomeOutlined className="menu-item-icon" />
        City
      </Link>,
      <Link to="/zone" style={{ color: 'white', marginRight: '10px' }}>
        <HomeOutlined className="menu-item-icon" />
        Zone
      </Link>,
      <Link to="/serie" style={{ color: 'white', marginRight: '10px' }}>
        <HomeOutlined className="menu-item-icon" />
        Serie
      </Link>,
      <Link to="/specialite" style={{ color: 'white', marginRight: '10px' }}>
        <HomeOutlined className="menu-item-icon" />
        Specialite
      </Link>,
      <Link to="/restaurantlist" style={{ color: 'white', marginRight: '10px' }}>
        <HomeOutlined className="menu-item-icon" />
        Restaurant
      </Link>,
          <Menu.Item key="/profile" className="menu-item">
            <ProfileDropdownMenu
              currentUser={currentUser}
              handleMenuClick={this.handleMenuClick}
            />
          </Menu.Item>,
        ]
      : [

        <Link to="/login" style={{ color: 'white' }}>
              <HomeOutlined className="menu-item-icon" />

      Login</Link>,

           <Link to="/signup" style={{ color: 'white' }}>
                       <HomeOutlined className="menu-item-icon" />
           Signup</Link>,
          
          
          ,
        ];

    return (
      <header className="head1">
      <div className="container">
          <div className="app-title">
            <Link to="/">Restaurant App</Link>
          </div>
          <Menu
  className="container blue-background" 
  mode="horizontal"
  selectedKeys={[this.props.location.pathname]}
  style={{ lineHeight: '64px'}}
>

            {menuItems}
          </Menu>
        </div>
      </header>
    );
  }
}

function ProfileDropdownMenu(props) {
  const { currentUser } = props;

  const dropdownMenu = (
    <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
      <Menu.Item key="user-info" className="dropdown-item" disabled>
        <div className="user-full-name-info">{currentUser.name}</div>
        <div className="username-info">@{currentUser.username}</div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="profile" className="dropdown-item">
        <Link to={`/users/${currentUser.username}`}>Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" className="dropdown-item">
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={dropdownMenu}
      trigger={['click']}
      getPopupContainer={() =>
        document.getElementsByClassName('profile-menu')[0]
      }
    >
      <div className="nav-avatar">
        <Avatar size="small" icon={<UserOutlined />} />
        <span style={{ color: 'white' }} className="nav-username">{currentUser.username}</span>
        <DownOutlined />
      </div>
    </Dropdown>
  );
}

export default withRouter(AppHeader);
