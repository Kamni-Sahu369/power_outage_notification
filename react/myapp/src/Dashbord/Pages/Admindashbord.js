import React, { useEffect, useState } from "react";
import "../Style/Admindashbord.css";
import { PiBellRingingThin } from "react-icons/pi";
import logoutIcon from "../Adminimages/logout.png";
import { Link } from "react-router-dom";
import { GetreportData } from "../../CoreApi";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [data, setdata] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const Navigate = useNavigate();

  const fetchdata = async () => {
    const response = await GetreportData();
    console.log("API Response:", response);
    if (Array.isArray(response)) {
      setdata(response);
    } else if (response?.data && Array.isArray(response.data)) {
      setdata(response.data);
    } else {
      setdata([]);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);
  const handleNavigate = () => {
        Navigate("viewreport");
  };
  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="admin-dashboard">
      {/* Header Section */}
      <div className="header">
        <div className="welcome-text">
          <h4>Welcome Back</h4>
          <h3>Admin Panel</h3>
        </div>

        <div className="header-icons">
          <div
            className="notification-wrapper"
            onClick={() => {
              fetchdata();
              setShowPopup(true);
            }}
          >
            <PiBellRingingThin className="bell-icon" />
            {data.length > 0 && <span className="badge">{data.length}</span>}
          </div>

          <Link to="/Logout">
            <img src={logoutIcon} alt="Logout" className="icon" />
          </Link>
        </div>
      </div>

      {/* ✅ Modal Popup */}
      {showPopup && (
        <div className="popup-overlay" onClick={handleClose}>
          <div className="popup-modal" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ color: "orange" ,fontFamily:"Times New Roman",}}>Reported Issues</h3>
            <button className="close-btn" onClick={handleClose}>✖</button>
            {data.length === 0 ? (
              <p>No Reports Yet</p>
            ) : (
              data.map((i, index) => (
                <div key={index} className="popup-item">
                  <h4 style={{ color: "blue" ,fontFamily:"Times New Roman",}}> Complainant Name:-{i.fullName}</h4>
                  <br />
                  <p style={{ color: "black" ,fontFamily:"Times New Roman",}}>Issue Type:-{i.issueType}</p>
                  <p style={{ color: "black" ,fontFamily:"Times New Roman",}}>Address:-{i.address}</p>
                   <p style={{ color: "black" ,fontFamily:"Times New Roman",}}>Time:-{i.issueDateTime}</p>
                  <p style={{ color: "black" ,fontFamily:"Times New Roman",}}>Description:-{i.description}</p>
                  <hr />
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Outage Report Section */}
      <div className="outage-report">
        <h3>
          Experiencing a power outage?<br /> Report it instantly to get updates.
        </h3>
        <p>
          Stay informed about power disruptions. Reporting an outage helps us resolve issues faster.
        </p>
        <button onClick={handleNavigate}>View Reported Outages</button>
      </div>

      {/* Stats Section */}
      <div className="stats-container">
        <div className="stat-box">
          <h4>🟦Total Meters</h4>
          <p>1,234</p>
          <h4>active:32 । inactive:60</h4>
        </div>
        <div className="stat-box">
          <h4>🟦Total Transformers</h4>
          <p>567</p>
          <h4>active:32 । inactive:60</h4>
        </div>
        <div className="stat-box">
          <h4>🟦Total Feeders</h4>
          <p>89</p>
          <h4>active:32। inactive:60</h4>
        </div>
        <div className="stat-box">
          <h4>🟦Upcoming Outages</h4>
          <p>5</p>
          <h4>active:32 । inactive:60</h4>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
