import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, ResponsiveContainer } from 'recharts';
import '../Style/ReportAnalysis.css';

const summaryStats = [
  { title: "Total Outages", value: 45, color: "#ef4444" },
  { title: "Resolved", value: 32, color: "#22c55e" },
  { title: "Pending", value: 13, color: "#f97316" },
  { title: "Affected Areas", value: 7, color: "#3b82f6" },
];

const areaData = [
  { area: 'Raipur', count: 10 },
  { area: 'Bhilai', count: 8 },
  { area: 'Durg', count: 12 },
  { area: 'Rajim', count: 5 },
];

const pieData = [
  { name: 'Resolved', value: 32 },
  { name: 'Pending', value: 13 },
];

const lineData = [
  { day: 'Mon', outages: 6 },
  { day: 'Tue', outages: 8 },
  { day: 'Wed', outages: 10 },
  { day: 'Thu', outages: 5 },
  { day: 'Fri', outages: 7 },
];

const COLORS = ['#22c55e', '#f97316'];

function ReportAnalysis() {
  return (
    <div className="report-container">
      <h2> Report Analysis</h2>
      <br></br>
      <br></br>

      <div className="summary-cards">
        {summaryStats.map((stat, index) => (
          <div className="card" key={index} style={{ backgroundColor: stat.color }}>
            <h4>{stat.title}</h4>
            <p>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="charts-section">
        <div className="chart-box">
          <h4>📍 Area-wise Outage</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={areaData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="area" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h4>📈 Outage Trends</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="outages" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h4>🧾 Resolution Status</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ReportAnalysis;
