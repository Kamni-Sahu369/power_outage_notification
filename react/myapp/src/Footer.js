import React from "react";
import "./App.css";
import image from "../src/images/cspdcllogo.jpg"
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Left Section - Logo + Contact Details */}
        <div className="footer-left">
          <img src={image} alt="CSPDCL Logo" className="footer-logo" />
          <p><FaPhoneAlt className="icon" /> 0771-2574166</p>
          <p><FaEnvelope className="icon" /> webadmin@cspc.co.in</p>
        </div>

        {/* Center Section - Address */}
        <div className="footer-center">
          <h3>Address</h3>
          <p><FaMapMarkerAlt className="icon" /> Energy Information Technology Center</p>
          <p>Shed No. 8, Chhattisgarh State Power </p>Company Campus
          <p>Dangania, Raipur (C.G.) - 492013</p>
        </div>

        {/* Right Section - About CSPDCL */}
        <div className="footer-right">
          <h3>About CSPDCL</h3>
          <p>
            Chhattisgarh State Power Distribution Company Limited (CSPDCL) ensures efficient electricity distribution, 
            providing high-quality service to residents and industries across the state.
          </p>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2025 Chhattisgarh State Power Distribution Company Limited. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
