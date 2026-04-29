import React, { useState, useEffect } from 'react';
import { Table, Tag, Tooltip } from 'antd';
import { GetOutagedata } from '../../CoreApi';
import '../Style/Maintainance.css';

function Maintanance() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await GetOutagedata();
      setData(response);
    } catch (error) {
      console.error("Error fetching outage data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderStatusTag = (status) => {
    const colorMap = {
      Active: 'blue',
      Resolved: 'green',
      Pending: 'orange',
      Failed: 'red'
    };
    return <Tag color={colorMap[status] || 'default'}>{status}</Tag>;
  };

  const columns = [
    { title: 'SN', dataIndex: 'sn', key: 'sn' },
    { title: 'Town', dataIndex: 'town', key: 'town' },
    { title: 'Activity', dataIndex: 'maintenance_activity', key: 'maintenance_activity' },
    { title: 'Affected Area', dataIndex: 'outage_affected_area', key: 'outage_affected_area' },
    { title: 'Outage Area', dataIndex: 'outage_area', key: 'outage_area' },
    { title: 'Start Date', dataIndex: 'outage_start_date', key: 'outage_start_date' },
    { title: 'Start Time', dataIndex: 'start_time', key: 'start_time' },
    { title: 'End Date', dataIndex: 'end_date', key: 'end_date' },
    { title: 'End Time', dataIndex: 'end_time', key: 'end_time' },
    { title: 'Type', dataIndex: 'outage_type', key: 'outage_type' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: renderStatusTag
    }
  ];

  return (
    <div className="maintanance-container">
      <div className="maintanance-header">
        <h2>Maintenance Outage Data</h2>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="sn"
        pagination={{ pageSize: 5 }}
        className="custom-ant-table"
      />
    </div>
  );
}

export default Maintanance;
