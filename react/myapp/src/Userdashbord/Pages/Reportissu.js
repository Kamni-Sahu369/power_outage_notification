import React, { useState } from "react";
import reportback from "../Userimage/Untitled design.jpg";
import "../Style/Reportissu.css";
import { Form, Input, Select, DatePicker, Button, Steps, message } from "antd";
import { GrUserWorker } from "react-icons/gr";
import { FaRegThumbsUp } from "react-icons/fa";
import { ReportData } from "../../CoreApi";
import { ToastContainer,toast } from "react-toastify";

const { Step } = Steps;

function Reportissu() {
  const [current, setCurrent] = useState(0);
  const [file, setFile] = useState(null);
  const [form] = Form.useForm();

  const next = () => {
    form
      .validateFields()
      .then(() => {
        setCurrent(current + 1);
      })
      .catch(() => {});
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const values = form.getFieldsValue(true); // ✅ get all values from all steps
      const formData = new FormData();
      formData.append("fullName", values.fullName);
      formData.append("email", values.email);
      formData.append("address", values.address);
      formData.append("issueType", values.issueType);
      formData.append("issueDateTime", values.issueDateTime.format("YYYY-MM-DD HH:mm:ss"));
      formData.append("description", values.description);
      if (file) {
        formData.append("image", file);
      }

      const response = await ReportData(formData);
      toast.success("Report Submitted Successfully!");
      form.resetFields();
      setFile(null);
      setCurrent(0);
    } catch (error) {
      console.error("Submit Error:", error);
      message.error("Failed to submit report. Please try again.");
    }
  };

  return (
    <div className="Reportissu_main">
      <img src={reportback} alt="Background" />
      <div className="Reportissu_inner">
        <div className="Reportissu_left">
          <h2>Post detailed credit report analysis in less than 2 minutes.</h2>

          <div className="Reportissu_left_inner">
            <Steps current={current} size="small" className="report-steps">
              <Step title="Basic Info" />
              <Step title="Issue Details" />
            </Steps>

            <Form
              form={form}
              layout="vertical"
              className="form-content"
              onFinish={handleSubmit}
            >
              {current === 0 && (
                <>
                  <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[{ required: true, message: "Please enter your name" }]}
                  >
                    <Input placeholder="Enter your name" />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: "Please enter your email" }]}
                  >
                    <Input placeholder="Enter your email or phone" />
                  </Form.Item>

                  <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: "Please mention the affected area/location" }]}
                  >
                    <Input.TextArea rows={2} placeholder="Mention the affected area/location" />
                  </Form.Item>
                </>
              )}

              {current === 1 && (
                <>
                  <Form.Item
                    label="Issue Type"
                    name="issueType"
                    rules={[{ required: true, message: "Please select issue type" }]}
                  >
                    <Select placeholder="Select Issue Type">
                      <Select.Option value="voltage">Voltage Fluctuation</Select.Option>
                      <Select.Option value="no-supply">No Power Supply</Select.Option>
                      <Select.Option value="low-voltage">Low Voltage</Select.Option>
                      <Select.Option value="meter-issue">Meter Issue</Select.Option>
                      <Select.Option value="sparking">Sparking in Line</Select.Option>
                      <Select.Option value="line-down">Line Down</Select.Option>
                      <Select.Option value="scheduled-maintenance">Scheduled Maintenance</Select.Option>
                      <Select.Option value="others">Others</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Date & Time of Issue"
                    name="issueDateTime"
                    rules={[{ required: true, message: "Please select the issue time" }]}
                  >
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      style={{ width: "100%" }}
                      placeholder="Select the issue time"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Additional Description"
                    name="description"
                    rules={[{ required: true, message: "Please describe the issue briefly" }]}
                  >
                    <Input.TextArea rows={2} placeholder="Describe the issue briefly" />
                  </Form.Item>
                </>
              )}

              <div className="form-navigation">
                {current > 0 && (
                  <Button onClick={prev} style={{ marginRight: 8 }}>
                    Previous
                  </Button>
                )}
                {current < 1 ? (
                  <Button type="primary" onClick={next}>
                    Next
                  </Button>
                ) : (
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                )}
              </div>
            </Form>
          </div>
        </div>

        <div className="Reportissu_right">
          {/* Image Preview */}
          <div className="preview-section">
            <img
              src={file ? URL.createObjectURL(file) : "/default-preview.jpg"}
              alt="Uploaded Preview"
              className="preview-image"
            />
          </div>

          <p className="upload-title">
            Help us see what you see
            <br />
            Attach a photo to explain better.
          </p>

          <div className="file-upload-wrapper">
            <input
              id="upload-btn"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden-file-input"
            />
            <label htmlFor="upload-btn" className="upload-button">
              Upload Photo
            </label>

            <div className="instructions-container">
              <div className="instruction-item">
                <GrUserWorker className="icon" />
                <div className="text">
                  <h4>Employee Will Inspect Soon</h4>
                  <p>Technician Dispatched for Inspection</p>
                </div>
              </div>

              <div className="instruction-item">
                <FaRegThumbsUp className="icon" />
                <div className="text">
                  <h4>Issue Fixed Promptly</h4>
                  <p>Your Issue Has Been Resolved Promptly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reportissu;
