import React from "react";
import "./HeroSection.css";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/Register'); 
  };

  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Stay Informed. Stay Powered.</h1>
          <p>Get real-time alerts on power outages and restoration updates.</p>
          <div className="cta-buttons">
            <a href="#" className="btn" onClick={handleClick}>Get Started</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
