import React, { useState } from "react";
import "./Contact.css";
import { Contectdata } from "../CoreApi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 👈 Prevent default form reload

    try {
      const response = await Contectdata(formData);
      console.log("Response:", response);
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to send message.");
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        {/* Contact Info */}
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p><strong>Address:</strong> CSPDCL Head Office, Danganiya, Raipur, Chhattisgarh</p>
          <p><strong>Email:</strong> support@cspdcl.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14716.22996960087!2d81.65422423491882!3d21.251384257309472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2922942dce4aab%3A0xa0b1601875cd55cd!2sCSPDCL%20Head%20Office%2C%20Danganiya%2C%20Raipur!5e0!3m2!1sen!2sin!4v1718190000000!5m2!1sen!2sin"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="CSPDCL Office Location"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form">
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit}>
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
