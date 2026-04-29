import React from "react";
import "./App.css";
import img from "./images/map icon.jpg"


const FeaturesSection = () => {
  return (
    <section className="features">
      <h2 className="features-heading">Our Key Features</h2>
      <div className="features-grid">
        {/* Feature 1: Real-time Notifications */}
        <div className="feature-card">
          <img 
            src="https://img.icons8.com/ios/50/000000/appointment-reminders.png" 
            alt="Real-time Notifications" 
            className="feature-icon" 
          />
          <h3>Real-time Notifications</h3>
          <p>Get instant SMS, email, or push notifications for power outages and restoration.</p>
        </div>
        
        {/* Feature 2: AI Predictions */}
        <div className="feature-card">
          <img 
            src="https://img.icons8.com/ios/50/000000/artificial-intelligence.png" 
            alt="AI Predictions" 
            className="feature-icon" 
          />
          <h3>AI Predictions</h3>
          <p>AI-powered forecasting to predict power outages before they happen.</p>
        </div>
        
        {/* Feature 3: Interactive Map */}
        <div className="feature-card">
        <img 
           src={img}
             alt="Interactive Map" 
           className="feature-icon" 
             />


          <h3>Interactive Map</h3>
          <p>Track live power outages in your area with an interactive map.</p>
        </div>
        
        {/* Feature 4: Company Portal */}
        <div className="feature-card">
          <img 
            src="https://img.icons8.com/ios/50/000000/building.png" 
            alt="Company Portal" 
            className="feature-icon" 
          />
          <h3>Company Portal</h3>
          <p>Allow electricity providers to update outages and view consumer complaints.</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
