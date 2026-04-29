import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "antd";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../Style/Userhome.css";
import { BsPlugin } from "react-icons/bs";
import { IoIosTimer } from "react-icons/io";
import { MdOutlineCrisisAlert, MdGpsFixed } from "react-icons/md";
import { CountOutagedata } from "../../CoreApi";

const HomeDashboard = () => {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CountOutagedata();
        setCount(response);
      } catch (error) {
        console.error("Error fetching outage count:", error);
      }
    };

    fetchData();
  }, []);

  const items = count ? [
    {
      icon: <BsPlugin />,
      label: "Total Outage",
      value: count.total_outage,
      color: "linear-gradient(135deg, #3f51b5, #5c6bc0)",
    },
    {
      icon: <MdOutlineCrisisAlert />,
      label: "Active",
      value: count.active_outage,
      color: "linear-gradient(135deg, #2196f3, #03a9f4)",
    },
    {
      icon: <IoIosTimer />,
      label: "Pending",
      value: count.pending_outage,
      color: "linear-gradient(135deg, #009688, #4db6ac)",
    },
    {
      icon: <MdGpsFixed />,
      label: "Resolved",
      value: count.resolved_outage,
      color: "linear-gradient(135deg, #4caf50, #66bb6a)",
    },
  ] : [];

  const areaData = [
    { month: "Jan", series1: 30, series2: 20 },
    { month: "Feb", series1: 40, series2: 35 },
    { month: "Mar", series1: 50, series2: 25 },
    { month: "Apr", series1: 55, series2: 40 },
    { month: "May", series1: 80, series2: 50 },
    { month: "Jun", series1: 110, series2: 60 },
    { month: "Jul", series1: 100, series2: 45 },
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">📊 Dashboard Overview</h1>

      <Card className="chart_card" style={{ borderRadius: "16px", padding: "24px" }}>
        <Row gutter={[16, 16]} justify="center">
          {items.map((item, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6} xl={4}>
              <div className="dashboard-card-colored fancy-glass" style={{ background: item.color }}>
                <div className="bubble bubble-top-right"></div>
                <div className="bubble bubble-bottom-right"></div>
                <div className="icon">{item.icon}</div>
                <div className="label">{item.label}</div>
                <div className="value">{item.value}</div>
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      <div className="chart-card">
        <h3>Outage Trend Graph</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={areaData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSeries1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3f51b5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3f51b5" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorSeries2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4caf50" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4caf50" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="series1" stroke="#3f51b5" fillOpacity={1} fill="url(#colorSeries1)" />
            <Area type="monotone" dataKey="series2" stroke="#4caf50" fillOpacity={1} fill="url(#colorSeries2)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HomeDashboard;
