// // AdminLayout.js
// import React, { useState } from "react";
// import { Layout } from "antd";
// import { Outlet } from "react-router-dom";
// import Sidebar from "../Component/Sidebar";

// const { Content } = Layout;

// const AdminLayout = () => {
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      
//       <Layout 
//         style={{ 
//           marginLeft: collapsed ? 80 : 200,
//           transition: 'margin-left 0.2s'
//         }}
//       >
//         <Content 
//           style={{ 
//             margin: '16px',
//             padding: '24px',
//             background: '#fff',
//             minHeight: 'calc(100vh - 32px)',
//             borderRadius: '8px'
//           }}
//         >
//           <Outlet />
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default AdminLayout;





import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Component/Sidebar";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar></Sidebar>
      <Outlet /> {/* 🔥 This is where nested admin pages will render */}
    </div>
  );
};

export default AdminLayout;
