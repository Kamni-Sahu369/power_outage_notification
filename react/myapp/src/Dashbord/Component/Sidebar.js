import React, { useState } from "react";
import "../Style/Sidebar.css";
import { Link } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DesktopOutlined,
  ContainerOutlined,
  BellOutlined,
  EnvironmentOutlined,
  UserOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";

const items = [
  {
    key: '1',
    icon: <DesktopOutlined />,
    label: <Link to="/Dashbord" className="Sidebarlink">Dashboard</Link>,
  },
  {
    key: '2',
    icon: <BellOutlined />,
    label: <Link to="/dashboard/notification" className="Sidebarlink">Notification Alert</Link>,
  },
  {
    key: '3',
    icon: <ContainerOutlined />,
    label: <Link to="/dashboard/outagemanagement" className="Sidebarlink">Outage Management</Link>,
  },
  {
    key: '4',
    icon: <EnvironmentOutlined />,
    label: <Link to="/dashboard/mapview" className="Sidebarlink">Map View</Link>,
  },
  {
    key: '5',
    icon: <BarChartOutlined />,
    label: <Link to="/dashboard/reportanalysis" className="Sidebarlink">Report Analysis</Link>,
  },
  {
    key: '6',
    icon: <UserOutlined />,
    label: <Link to="/dashboard/usermanagement" className="Sidebarlink">User Management</Link>,
  },
   {
    key: '7',
    icon: <UserOutlined />,
    label: <Link to="/Logout" className="Sidebarlink">logout</Link>,
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="sidebar_main" style={{ width: "auto", height: "auto" }}>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        className="dashboardheaderbutton"
        style={{ marginBottom: 16 }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        inlineCollapsed={collapsed}
        items={items}
        className="dashboardheaderinner"
      />
    </div>
  );
};

export default Sidebar;
