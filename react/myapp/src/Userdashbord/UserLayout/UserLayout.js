import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "../Component/Usersidebar";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false); // ✅ Add this

  return (
    <div style={{ display: "flex" }}>
      <UserSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div style={{ flex: 1, marginLeft: collapsed ? 80 : 0 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;

