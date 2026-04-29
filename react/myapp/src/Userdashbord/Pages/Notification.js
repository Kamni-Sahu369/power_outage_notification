import { useEffect, useState } from "react";
import { GetOutagedata } from "../../CoreApi";
import "../Style/Notification.css";

const AlertPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState("All");       // Status filter
  const [searchArea, setSearchArea] = useState("");  // Area search input
  const [loading, setLoading] = useState(true);

  const fetchOutageData = async () => {
    try {
      const response = await GetOutagedata();
      setAlerts(response);
    } catch (error) {
      console.error("Error fetching outages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOutageData();
  }, []);

  const handleMarkRead = (sn) => {
    setAlerts((prev) => prev.filter((alert) => alert.sn !== sn));
  };

  const filteredAlerts = alerts.filter((alert) => {
    const matchesStatus = filter === "All" || alert.status === filter;
    const matchesArea =
      searchArea.trim() === "" ||
      alert.town.toLowerCase().includes(searchArea.toLowerCase());
    return matchesStatus && matchesArea;
  });

  return (
    <div className="alert-page">
      <h2>Power interruptions are temporary — but your safety and awareness are <br></br> permanent priorities</h2>

      {/* 🔍 Filters section */}
      <div className="alert-filters">
        {/* Status Filter */}
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Alerts</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>

        {/* Area Search Input */}
        <input
          type="text"
          className="area-search-input"
          placeholder="Search by area name..."
          value={searchArea}
          onChange={(e) => setSearchArea(e.target.value)}
        />
      </div>

      {/* 🔄 Alert List */}
      {loading ? (
        <p>Loading alerts...</p>
      ) : (
        <div className="alert-list">
          {filteredAlerts.length === 0 ? (
            <p className="no-alerts">No alerts available.</p>
          ) : (
            filteredAlerts.map((alert) => (
              <div
                key={alert.sn}
                className={`alert-card ${alert.status.toLowerCase()}`}
              >
                <div className="alert-header">
                  <h4>{alert.town}</h4>
                  <span className={`badge ${alert.status.toLowerCase()}`}>
                    {alert.status}
                  </span>
                </div>
                <p>{alert.maintenance_activity}</p>
                <div className="alert-footer">
                  <span>📍 {alert.outage_affected_area}</span>
                  <span>🕒 {alert.outage_area}</span>
                  <span>📍 {alert.outage_start_date}</span>
                  <span>🕒 {alert.start_time}</span>
                  <span>📍 {alert.end_date}</span>
                  <span>🕒 {alert.end_time}</span>
                  <span>📍 {alert.outage_type}</span>
                  <span>🕒 {alert.status}</span>
                </div>
                <button
                  className="mark-read-btn"
                  onClick={() => handleMarkRead(alert.sn)}
                >
                  Mark as Read
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AlertPage;


