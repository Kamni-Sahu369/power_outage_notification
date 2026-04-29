import React, { useEffect, useState } from "react";
import "../Style/Usermanagement.css";
import { GEtLoginData, UpdateUser, DeleteUser } from "../../CoreApi";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Modal, Input, Form, Button, message } from "antd";

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [form] = Form.useForm();

  const fetchRegisterData = async () => {
    const response = await GEtLoginData();
    setUsers(response);
  };

  useEffect(() => {
    fetchRegisterData();
  }, []);

  const handleView = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
    form.setFieldsValue(user);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateSubmit = async () => {
    try {
      const values = await form.validateFields();
      await UpdateUser(selectedUser.id, values);
      alert("User updated successfully");
      setIsUpdateModalOpen(false);
      fetchRegisterData(); // Refresh list
    } catch (error) {
      console.error(error);
      alert("Failed to update user");
    }
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await DeleteUser(selectedUser.id);
      alert("User deleted successfully");
      setIsDeleteModalOpen(false);
      fetchRegisterData(); // Refresh list
    } catch (error) {
      console.error(error);
      alert("Failed to delete user");
    }
  };
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <h2>Manage User</h2>

      <div className="stats-container">
        <div className="stat-card">
          <p>Total Users</p>
          <h3>{users.length}</h3>
        </div>
        <div className="stat-card">
          <p>Active Users</p>
          <h3>75</h3>
        </div>
        <div className="stat-card">
          <p>Inactive Users</p>
          <h3>25</h3>
        </div>
        <div className="stat-card">
          <p>New Users Today</p>
          <h3>5</h3>
        </div>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-btn">Search</button>
        <button className="add-btn">Add User</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Pincode</th>
            <th>House No</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.address}</td>
              <td>{user.emailaddress}</td>
              <td>{user.mobilenumber}</td>
              <td>{user.pincode}</td>
              <td>{user.houseno}</td>
              <td>
                <button
                  className="icon-btn view-btn"
                  onClick={() => handleView(user)}
                >
                  <EyeOutlined />
                </button>
                <button
                  className="icon-btn edit-btn"
                  onClick={() => handleUpdate(user)}
                >
                  <EditOutlined />
                </button>
                <button
                  className="icon-btn delete-btn"
                  onClick={() => handleDelete(user)}
                >
                  <DeleteOutlined />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Modal */}
      <Modal
        title="User Details"
        visible={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
      >
        {selectedUser && (
          <div className="modal-content">
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Address:</strong> {selectedUser.address}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.emailaddress}
            </p>
            <p>
              <strong>Mobile Number:</strong> {selectedUser.mobilenumber}
            </p>
            <p>
              <strong>Pincode:</strong> {selectedUser.pincode}
            </p>
            <p>
              <strong>House No:</strong> {selectedUser.houseno}
            </p>
          </div>
        )}
      </Modal>

      {/* Update Modal */}
      <Modal
        title="Update User"
        visible={isUpdateModalOpen}
        onCancel={() => setIsUpdateModalOpen(false)}
        onOk={handleUpdateSubmit}
        okText="Update"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="emailaddress"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="mobilenumber"
            label="Mobile Number"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="pincode" label="Pincode">
            <Input />
          </Form.Item>
          <Form.Item name="houseno" label="House No">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        title="Confirm Delete"
        visible={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onOk={handleDeleteConfirm}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <p>
          Are you sure you want to delete <strong>{selectedUser?.name}</strong>?
        </p>
      </Modal>
    </div>
  );
};

export default UserDashboard;
