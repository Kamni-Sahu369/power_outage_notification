import React from "react";
import "./Register.css";
import Registerimg from "../images/cspdclimage.jpg";
import { Form, Input, Button,Select} from "antd";
import { ToastContainer, toast } from 'react-toastify';
import {
  UserOutlined,
  LockOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  NumberOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import { PostCategories } from "../CoreApi";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const Demo = async (values) => {
    console.log("Received values:", values);
    try {
      const response = await PostCategories(values);
      console.log("response", response);
      toast.success("Register successful");
      navigate("/");
    } catch (error) {
      // alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="divmain">
      <div className="div_main">
        <div className="div_1">
          <h3>Register Here</h3>
          <Form onFinish={Demo}>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Please enter your full name!" },
              ]}
            >
              <Input
                type="text"
                placeholder="Full Name*"
                className="input-box"
                prefix={<UserOutlined />}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password
                placeholder="Password*"
                className="input-box"
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <Form.Item
              name="address"
              rules={[
                { required: true, message: "Please enter your address!" },
              ]}
            >
              <Input
                type="text"
                placeholder="Address*"
                className="input-box"
                prefix={<HomeOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="emailaddress"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input
                type="email"
                placeholder="Email Address*"
                className="input-box"
                prefix={<MailOutlined />}
              />
            </Form.Item>

            <Form.Item
              name="mobilenumber"
              rules={[
                {
                  required: true,
                  pattern: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit mobile number!",
                },
              ]}
            >
              <Input
                type="tel"
                placeholder="Mobile Number*"
                className="input-box"
                prefix={<PhoneOutlined />}
              />
            </Form.Item>

            <Form.Item
              name="pincode"
              rules={[
                {
                  required: true,
                  pattern: /^[0-9]{6}$/,
                  message: "Please enter a valid 6-digit PIN code!",
                },
              ]}
            >
              <Input
                type="text"
                placeholder="PIN Code*"
                className="input-box"
                prefix={<NumberOutlined />}
              />
            </Form.Item>

            <Form.Item
              name="houseno"
              rules={[
                { required: true, message: "Please enter your house number!" },
              ]}
            >
              <Input
                type="number"
                placeholder="House No*"
                className="input-box"
                prefix={<ApartmentOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="registrationType"
              rules={[{ required: true, message: "Please select your role!" }]}
            >
              <Select
                placeholder="User Role*"
                className="input-box"
                style={{width: "250px"}}
              >
                <Select.Option value="user">User</Select.Option>
                <Select.Option value="admin">Admin</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-button">
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="div_2">
          <img src={Registerimg} alt="CSPDCL" />
          <p>
            CSPDCL is continuously moving forward with its commitment to
            illuminating every home so that darkness never enters your life.
          </p>
          <h3>. . . . . . . .</h3>
        </div>
      </div>
    </div>
  );
}

export default Register;
