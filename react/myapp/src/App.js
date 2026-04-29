import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./Home";
import Register from "./Resister/Register";
import Header from "./Header/Header";
import FeaturesSection from "./FeaturesSection";
import Footer from "./Footer";
import Contact from "./Contact/Contactsection";
import Antd from "./Antd.js";
import ProtectedRoute from "../src/Route/Protected_route.js";
import PublicRoute from "../src/Route/Public_route.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Admin Pages
import Dashbord from "./Dashbord/Pages/Dashbord";
import MapView from "./Dashbord/Pages/MapView";
import NotificationAlert from "./Dashbord/Pages/NotificationAlert";
import OutageManagement from "./Dashbord/Pages/OutageManagement";
import ReportAnalysis from "./Dashbord/Pages/ReportAnalysis";
import UserManagement from "./Dashbord/Pages/UserManagement";
import AdminLayout from "../src/Dashbord/AdminLayout/AdminLayout.js";
import Maintanance from "./Dashbord/Pages/Maintanance.js";
import TommorowOutage from "./Dashbord/Pages/TommorowOutage.js";
import ViewReport from "./Userdashbord/Pages/ViewReport.js";
import Sidebar from "./Dashbord/Component/Sidebar.js";

// User Pages
import Userhome from "./Userdashbord/Pages/Userhome";
import UserMapView from "./Userdashbord/Pages/MapView";
import Myprofile from "./Userdashbord/Pages/Myprofile";
import Outagestatus from "./Userdashbord/Pages/Outagestatus";
import Reportissu from "./Userdashbord/Pages/Reportissu";
import Logout from "./Userdashbord/Pages/Logout";
import UserNotification from "./Userdashbord/Pages/Notification";
import UserLayout from "../src/Userdashbord/UserLayout/UserLayout.js";
import Usersidebar from "./Userdashbord/Component/Usersidebar.js";

function AppWrapper() {
  const [isLogin, setIsLogin] = useState(false);
  const location = useLocation();

  const publicRoutes = ["/", "/features", "/footer", "/contact", "/register", "/login"];
  const showHeaderFooter = publicRoutes.includes(location.pathname);

  return (
    <>
      {showHeaderFooter && <Header />}

      <Routes>
        {/* 🔓 Public Routes */}
        <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
        <Route path="/features" element={<PublicRoute><FeaturesSection /></PublicRoute>} />
        <Route path="/footer" element={<PublicRoute><Footer /></PublicRoute>} />
        <Route path="/contact" element={<PublicRoute><Contact /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Antd isLogin={isLogin} setIsLogin={setIsLogin} /></PublicRoute>} />

        {/* 🔐 Admin Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashbord />} />
          <Route path="mapview" element={<MapView />} />
          <Route path="Sidebar" element={<Sidebar />} />
          <Route path="notification" element={<NotificationAlert />} />
          <Route path="outagemanagement" element={<OutageManagement />} />
          <Route path="reportanalysis" element={<ReportAnalysis />} />
          <Route path="usermanagement" element={<UserManagement />} />
          <Route path="maintanance" element={<Maintanance />} />
          <Route path="tommorowoutage" element={<TommorowOutage />} />
          <Route path="viewreport" element={<ViewReport />} />
        </Route>

        {/* 👤 User Protected Routes */}
        <Route path="/user" element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UserLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Userhome />} />
          <Route path="profile" element={<Myprofile />} />
          <Route path="Usersidebar" element={<Usersidebar />} />
          <Route path="mapview" element={<UserMapView />} />
          <Route path="outagestatus" element={<Outagestatus />} />
          <Route path="reportissue" element={<Reportissu />} />
          <Route path="notifications" element={<UserNotification />} />
        </Route>

        {/* 🔓 Logout (for both) */}
        <Route path="/logout" element={
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            <Logout />
          </ProtectedRoute>
        } />

        {/* 🔁 Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {showHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
       <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;







