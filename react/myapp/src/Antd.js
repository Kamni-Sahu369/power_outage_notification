import React, { useState } from "react";
import { Button, ConfigProvider, Modal, Space, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./Style.css";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

function Antd({ isLogin, setIsLogin }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // Show modal on button click
  const Demo = () => {
    setIsModalOpen(true);
  };

  // Login handler
  // function handleLogin(values) {
  //   console.log("Sending:", values.emailaddress, values.password);

  //   axios
  //     .post("http://127.0.0.1:8000/api/login/", values, {
  //       withCredentials: true,
  //     })
  //     .then((response) => {
  //       console.log("Login response:", response.data);

  //       if (response.data.message === "Login successful") {
  //         const role = response.data.role;
  //         localStorage.setItem("role", role);
  //         localStorage.setItem("isLogin", JSON.stringify(true));
  //         alert("Login successful!");
  //         setIsModalOpen(false);
  //         setIsLogin(true);

  //         // ✅ Navigate safely without triggering loop
  //         if (role === "admin" && window.location.pathname !== "/dashboard") {
  //           navigate("/dashboard");
  //         } else if (role === "user" && window.location.pathname !== "/user") {
  //           navigate("/user");
  //         } else {
  //           alert("Unknown role!");
  //           navigate("/login");
  //         }
  //       } else {
  //         alert("Login failed! Incorrect username or password.");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Login Error:", error.response || error);
  //       alert("Login failed! Please check your credentials.");
  //     });
  // }

  function handleLogin(values) {
  console.log("Sending:", values.emailaddress, values.password);

  axios
    .post("http://127.0.0.1:8000/api/login/", values, {
      withCredentials: true,
    })
    .then((response) => {
      try {
        console.log("Login response:", response.data);

        if (response.data.message === "Login successful") {
          const role = response.data.role;

          // ✅ Safety check
          if (!role) throw new Error("Role not found in response");

          localStorage.setItem("role", role);
          localStorage.setItem("id", response.data.id);
          localStorage.setItem("isLogin", JSON.stringify(true));
           toast.success("Login successful");
          setIsModalOpen(false);

          // ❗This line may be undefined if not passed from parent
          if (typeof setIsLogin === "function") {
            setIsLogin(true);
          } else {
            console.warn("setIsLogin is not defined or not a function");
          }

          // ✅ Role-based navigation
          if (role === "admin" && window.location.pathname !== "/dashboard") {
            navigate("/dashboard");
          } else if (role === "user" && window.location.pathname !== "/user") {
            navigate("/user");
          } else {
            alert("Unknown role!");
            navigate("/login");
          }
        } else {
          alert("Login failed! Incorrect username or password.");
        }
      } catch (innerError) {
        console.error("Error inside .then() block:", innerError);
        alert("Something went wrong after login.");
      }
    })
    .catch((error) => {
      console.error("Login Error (catch block):", error);
      alert("Login failed! Please check your credentials.");
    });
}
  return (
    <div>
      <Space>
        <Button className="glass-button" onClick={Demo}>
          LOGIN
        </Button>
      </Space>

      <ConfigProvider>
        <Modal
          title={<span className="modal-title">Login</span>}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          className="custom-modal"
        >
          <Form className="custom-form" form={form} onFinish={handleLogin}>
            <Form.Item
              name="emailaddress"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input
                className="custom-input"
                type="email"
                placeholder="Email*"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                className="custom-input"
                placeholder="Password*"
              />
            </Form.Item>

            <p>
              Don't have an account? <Link to="/Register">Register</Link>
            </p>

            <Form.Item>
              <div className="login-options">
                <Button className="login-option-btn" htmlType="submit">
                  Login
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </ConfigProvider>
    </div>
  );
}

export default Antd;
