import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  BellOutlined,
  FileTextOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FundProjectionScreenOutlined
} from "@ant-design/icons";
import "../Style/Usersidebar.css";
// import Logout from "./Logout.js"


const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Local storage clear karo
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // User ko login page pe redirect karo
    navigate("/Login");
  };

  return (
    <Sider collapsible collapsed={collapsed} className="sidebar">
      <div className="toggle-button">
        <Button type="primary" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <Menu theme="dark" mode="inline">
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/user/profile">My Profile</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<FundProjectionScreenOutlined />}>
          <Link to="/user/outagestatus">Outage Status</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<BellOutlined />}>
          <Link to="/user/notifications">NotificationAlertAlerts</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<FileTextOutlined />}>
          <Link to="/user/reportissue">Reports</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<SettingOutlined />}>
          <Link to="/user/mapview">Map View</Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<LogoutOutlined />} className="logout">
          <Link to="/Logout">logout</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
