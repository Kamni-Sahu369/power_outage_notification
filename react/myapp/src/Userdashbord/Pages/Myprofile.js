import React, { useEffect, useRef, useState } from "react";
import "../Style/Myprofile.css";
import cspdcl from "../Userimage/logo.jpg";
import defaultProfile from "../Userimage/images (1).png";
import { GetProfileData, UpdateProfile } from "../../CoreApi";
import { Modal, Input, Button, Form, message } from "antd";

function Myprofile() {
  const [profileImage, setProfileImage] = useState(defaultProfile);
  const fileInputRef = useRef(null);
  const [profile, setprofile] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editProfile, seteditProfile] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

   const handleChange = (e) => {
    const { name, value } = e.target;
    seteditProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handletprofiledata = async () => {
    const response = await GetProfileData(localStorage.getItem("id"));
    setprofile(response);
  };

  useEffect(() => {
    handletprofiledata();
  }, []);

  const handleditprofiledata = async () => {
    const response = await GetProfileData(localStorage.getItem("id"));
    seteditProfile(response);
  };

  useEffect(() => {
    handleditprofiledata();
  }, []);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
// Handle update profile submit
  const handleSubmit = async () => {
    try {
      await UpdateProfile(editProfile.id, editProfile); // call your API
      alert("Profile updated successfully!");
      setShowPopup(false);
      handletprofiledata(); // refresh data after update
    } catch (error) {
      console.error(error);
      message.error("Failed to update profile.");
    }
  };

  return (
    <div>
      <div className="Myprofile_main">
        <div className="Myprofile_inner1">
          <div className="Myprofile_div1">
            <div className="Myprofile_img">
              <img
                src={profileImage}
                alt="Profile"
                className="Myprofile_img_display"
              />
            </div>
          </div>
          <div className="Myprofile_div2">
            <h1>Welcome User</h1>
            <h2>CSPDCL User</h2>
            <p>
              "Thank you for logging in! We’re committed to providing you <br />
              with seamless and efficient power solutions. Stay informed and{" "}
              <br />
              stay powered!" ⚡
            </p>
            <button
              className="Button1"
              onClick={() => {
                handleditprofiledata(); // fetch data before opening modal
                setShowPopup(true);
              }}
            >
              Edit profile
            </button>
            <button className="Button2" onClick={triggerFileInput}>
              Choose profile
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="Myprofile_inner2">
          <div className="Myprofile_div3">
            <img src={cspdcl} alt="CSPDCL Logo" />
            <p>
              "Powering Progress, Brightening Futures – Reliable Energy for
              All." ⚡💡
            </p>
          </div>
          <div className="Myprofile_div4">
            <h3 style={{ color: "white", fontWeight: "2px" }}>
              User Information
            </h3>
            <ul>
              {[profile].map((item) => (
                <li key={item.id}>
                  Name: {item.name} <br />
                  Email: {item.emailaddress} <br />
                  Mobile Number: {item.mobilenumber} <br />
                  Address: {item.address} <br />
                  Pincode: {item.pincode} <br />
                  House No: {item.houseno} <br />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div
        style={{
          height: "176px",
          width: "1000px",
          border: "none",
          backgroundColor: "blue",
        }}
      ></div>

      {/* ✅ Modal for Edit Profile */}
      <Modal
        title="Edit Profile"
        open={showPopup}
        onCancel={() => setShowPopup(false)}
        footer={null}
      >
        <div>
          {/* <p>Edit your profile details here:</p>
          <p>Name: {editProfile.name}</p>
          <p>Email: {editProfile.emailaddress}</p>
          <p>Mobile: {editProfile.mobilenumber}</p>
          <p>Address: {editProfile.address}</p>
          <p>Pincode: {editProfile.pincode}</p>
          <p>House No: {editProfile.houseno}</p> */}
           <Form layout="vertical">
            <Form.Item label="Name">
              <Input
                name="name"
                value={editProfile.name}
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item label="Email">
              <Input
                name="emailaddress"
                value={editProfile.emailaddress}
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item label="Mobile">
              <Input
                name="mobilenumber"
                value={editProfile.mobilenumber}
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item label="Address">
              <Input
                name="address"
                value={editProfile.address}
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item label="Pincode">
              <Input
                name="pincode"
                value={editProfile.pincode}
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item label="House No">
              <Input
                name="houseno"
                value={editProfile.houseno}
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" onClick={handleSubmit} block>
                Update Profile
              </Button>
            </Form.Item>
          </Form>
          {/* 📝 Later: Replace these with input fields for updating */}
        </div>
      </Modal>
    </div>
  );
}

export default Myprofile;
