import React, { useEffect, useState } from "react";
import { Table, Tag, Input, Select, Button, Space, Modal, Form } from "antd"; // 🔥 Added Modal and Form
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import {
  GetOutagedata,
  Deleteoutage,
  Updateoutage,
  Addoutage,
} from "../../CoreApi";
import "../Style/OutageManagement.css";

const { Option } = Select;

const OutageManagement = () => {
  const [outages, setOutages] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchLocation, setSearchLocation] = useState("");
  
  // 🔥 Modal state
  const [isModalVisible, setIsModalVisible] = useState(false); // Added
  const [isEditing, setIsEditing] = useState(false); // Added
  const [currentRecord, setCurrentRecord] = useState(null); // Added

  const [form] = Form.useForm(); // Added

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

  const handleDelete = async (id) => {
    try {
      await Deleteoutage(id);
      fetchOutageData();
      alert("Outage deleted successfully");
    } catch (error) {
      console.error("Error deleting outage:", error);
    }
  };

  const handleUpdate = async (id, values) => {
    try {
      await Updateoutage(id, values);
      fetchOutageData();
      alert("Outage updated successfully");
    } catch (error) {
      console.error("Error updating outage:", error);
    }
  };

  const handleAdd = async (values) => {
    try {
      await Addoutage(values);
      fetchOutageData();
      alert("Outage added successfully");
    } catch (error) {
      console.error("Error adding outage:", error);
    }
  };

  // 🔥 Modal open/close handlers
  const showAddModal = () => {
    setIsEditing(false);
    setCurrentRecord(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (record) => {
    setIsEditing(true);
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentRecord(null);
    form.resetFields();
  };

  const getStatusTagColor = (status) => {
    switch (status) {
      case "Active":
        return "gold";
      case "Resolved":
        return "green";
      case "Pending":
        return "orange";
      default:
        return "default";
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
      render: (status) => (
        <Tag color={getStatusTagColor(status)} key={status}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size={4}>
          <Button icon={<FiEdit />} onClick={() => showEditModal(record)} />{" "}
          {/* 🔥 Changed */}
          <Button
            danger
            icon={<FiTrash2 />}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="outage-container">
      <div className="outage-header">
        <h1
          style={{
            fontFamily: "Times New Roman",
            color: "blue",
            margin: "auto",
          }}
        >
          Manage Outages
        </h1>
        <Button type="primary" onClick={showAddModal}>
          ➕ Add Outage
        </Button>{" "}
        {/* 🔥 Added */}
      </div>
      <br></br>
      <div className="outage-filters">
        <Select
          defaultValue="All"
          style={{
            width: 280,
            fontFamily: "Times New Roman",
            marginLeft: "210px",
          }}
          onChange={(value) => setStatusFilter(value)}
        >
          <Option value="All" style={{ color: "gray" }}>
            -----ALL----
          </Option>
          <Option value="Active" style={{ color: "gray" }}>
            Active
          </Option>
          <Option value="Resolved" style={{ color: "gray" }}>
            Resolved
          </Option>
          <Option value="Pending" style={{ color: "gray" }}>
            Pending
          </Option>
        </Select>

        <Input
          placeholder="Search Location"
          style={{ width: 280 }}
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
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

      {/* 🔥 Modal Form */}
      <Modal
        title={isEditing ? "Update Outage" : "Add Outage"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={(values) => {
            if (isEditing) {
              handleUpdate(currentRecord.id, values);
            } else {
              handleAdd(values);
            }
            handleCancel();
          }}
        >
          <Form.Item name="sn" label="sn" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="town" label="Town" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="maintenance_activity"
            label="Activity"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="outage_affected_area"
            label="Affected Area"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="outage_area"
            label="Area"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="outage_start_date"
            label="Start Date"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="start_time"
            label="Start Time"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="end_date"
            label="End Date"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="end_time"
            label="End Time"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="outage_type"
            label="Type"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Resolved">Resolved</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {isEditing ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default OutageManagement;
