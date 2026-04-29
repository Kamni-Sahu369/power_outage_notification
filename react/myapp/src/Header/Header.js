import React from "react";
import "./Header.css"; 
import logo from "../images/cspdcllogo.jpg"
import Antd from "../Antd";
 
const Header = ({isLogin,setIsLogin}) => {
  console.log(isLogin);
  return (
    <header className="glass-header">
      <div className="logo-container">
        <img src={logo} alt="CSPDCL Logo" className="logo" />
        <h1 className="title">Power Outage Notification</h1>
      </div>
      <div className="login-container">
          {/* <button className="login-button">Login</button> */}
          <Antd isLogin={isLogin} setIsLogin={setIsLogin}/>
      </div>
    </header>
  );
};

export default Header;
