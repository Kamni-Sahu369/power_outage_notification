import React from "react";
import "../Style/Notificationalert.css";
import outageVideo from "../Adminimages/outage_video.mp4";
import maintenanceVideo from "../Adminimages/outage1_video.mp4";
import tomorrowVideo from "../Adminimages/electrician-14555945-11738141.mp4";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const fadeInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};

const PowerOutageCard = () => {
  const navigate = useNavigate();

  return (
    <div className="outage-card-container">
      <h1>"Stay updated with real-time alerts on outages, maintenance, and power restoration."</h1>
      <br />
      <br />

      {/* First Section */}
      <div className="outage-card-content">
        <motion.div
          className="outage-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          variants={fadeInLeft}
        >
          <h2>
            TOTAL PLANNED
            <br /> MAINTENANCE OUTAGE
          </h2>
          <p>
            "Stay prepared with scheduled maintenance alerts in your area. Plan
            ahead to avoid inconvenience and ensure your daily routine remains
            uninterrupted."
          </p>
          <button onClick={() => navigate("/Maintanance")}>Know More</button>
        </motion.div>

        <motion.div
          className="outage-right"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          variants={fadeInRight}
        >
          <video
            src={outageVideo}
            autoPlay
            muted
            loop
            playsInline
            className="outage-video"
          />
        </motion.div>
      </div>

      <br />
      <br />
      <br />
      <br />

      {/* Second Section */}
      <div className="outage-card-content">
        <motion.div
          className="outage-right"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          variants={fadeInLeft}
        >
          <video
            src={maintenanceVideo}
            autoPlay
            muted
            loop
            playsInline
            className="outage-video"
          />
        </motion.div>

        <motion.div
          className="outage-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          variants={fadeInRight}
        >
          <h2>
            TOTAL <br /> OUTAGE <br />
          </h2>
          <p>
            "Stay prepared with real-time power outage updates tailored for your
            area. Ensure safety and minimize disruption with timely alerts and
            essential service notifications."
          </p>
          <button onClick={() => navigate("/Maintanance")}>Know More</button>
        </motion.div>
      </div>

      <br />
      <br />
      <br />
      <br />

      {/* Third Section */}
      <div className="outage-card-content">
        <motion.div
          className="outage-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          variants={fadeInLeft}
        >
          <h2>
            ALL OUTAGE <br /> TOMORROW
          </h2>
          <p>
            "Get notified about all outages scheduled for tomorrow in your
            locality. Be ready, stay safe, and manage your time efficiently with
            advance alerts."
          </p>
          <button onClick={() => navigate("/TomorrowOutage")}>Know More</button>
        </motion.div>

        <motion.div
          className="outage-right"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          variants={fadeInRight}
        >
          <video
            src={tomorrowVideo}
            autoPlay
            muted
            loop
            playsInline
            className="outage-video"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default PowerOutageCard;
