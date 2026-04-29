import React, { useEffect, useState } from "react";
import { Table, Tag, Input, Select } from "antd";
import { GetOutagedata } from "../../CoreApi";
import "../Style/Outagestatus.css";

const { Option } = Select;

const ViewReport = () => {
  const [outages, setOutages] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchLocation, setSearchLocation] = useState("");

  const fetchOutageData = async () => {
    try {
      const response = await GetOutagedata();
      setOutages(response);
      setFilteredData(response);
    } catch (error) {
      console.error("Error fetching outages:", error);
    }
  };

  useEffect(() => {
    fetchOutageData();
  }, []);

  useEffect(() => {
    const filtered = outages.filter((item) => {
      const matchStatus =
        statusFilter === "All" || item.status === statusFilter;
      const matchLocation = item.town
        ?.toLowerCase()
        .includes(searchLocation.toLowerCase());
      return matchStatus && matchLocation;
    });
    setFilteredData(filtered);
  }, [statusFilter, searchLocation, outages]);

  const getStatusTag = (status) => {
    switch (status) {
      case "Active":
        return <Tag color="red">🔴 Active</Tag>;
      case "Resolved":
        return <Tag color="green">🟢 Resolved</Tag>;
      case "Pending":
        return <Tag color="orange">🟠 Pending</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  const columns = [
    { title: "ID", dataIndex: "sn", key: "sn" },
    { title: "Town", dataIndex: "town", key: "town" },
    {
      title: "Activity",
      dataIndex: "maintenance_activity",
      key: "maintenance_activity",
    },
    {
      title: "Affected Area",
      dataIndex: "outage_affected_area",
      key: "outage_affected_area",
    },
    { title: "Area", dataIndex: "outage_area", key: "outage_area" },
    {
      title: "Start Date",
      dataIndex: "outage_start_date",
      key: "outage_start_date",
    },
    { title: "Start Time", dataIndex: "start_time", key: "start_time" },
    { title: "End Date", dataIndex: "end_date", key: "end_date" },
    { title: "End Time", dataIndex: "end_time", key: "end_time" },
    { title: "Type", dataIndex: "outage_type", key: "outage_type" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusTag(status),
    },
  ];

  return (
    <div className="outage-container">
      <div className="outage-header">
        <h1 style={{margin:"auto"}}>
          "Reported Outages"
        </h1>
      </div>

      <div className="outage-filters">
        <Select
          defaultValue="All"
          style={{ width: 280,marginLeft:"210px" }}
          onChange={(value) => setStatusFilter(value)}
        >
          <Option value="All">-----ALL----</Option>
          <Option value="Active">Active</Option>
          <Option value="Resolved">Resolved</Option>
          <Option value="Pending">Pending</Option>
        </Select>

        <Input
          placeholder="Search Location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          style={{ width: 280 }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="sn"
        pagination={{ pageSize: 5 }}
        bordered
        className="custom-ant-table"
      />
    </div>
  );
};

export default ViewReport;
