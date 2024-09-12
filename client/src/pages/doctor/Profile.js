import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Form, Input, Row, TimePicker, Button, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import moment from "moment";
import "../doctor/Profile.css";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/doctor/updateProfile",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message || "Failed to update profile.");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
      message.error("An error occurred while updating profile.");
    }
  };

  const getDoctorInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      } else {
        message.error(res.data.message || "Failed to fetch doctor info.");
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred while fetching doctor info.");
    }
  };

  useEffect(() => {
    getDoctorInfo();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <h1>Manage Profile</h1>
      {doctor && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          initialValues={{
            ...doctor,
            timings: [
              moment(doctor.timings[0], "HH:mm"),
              moment(doctor.timings[1], "HH:mm"),
            ],
          }}
        >
          <h4>Personal Details:</h4>
          <Row gutter={20}>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: 'Please input your first name!' }]}
              >
                <Input placeholder="Your first name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: 'Please input your last name!' }]}
              >
                <Input placeholder="Your last name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="Phone No"
                name="phone"
                rules={[{ required: true, message: 'Please input your contact number!' }]}
              >
                <Input type="tel" placeholder="Your contact number" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please input your email address!' },
                  { type: 'email', message: 'Please enter a valid email address!' },
                ]}
              >
                <Input type="email" placeholder="Your email address" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item label="Website" name="website">
                <Input placeholder="Your website (optional)" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: 'Please input your clinic address!' }]}
              >
                <Input placeholder="Your clinic address" />
              </Form.Item>
            </Col>
          </Row>
          <h4>Professional Details:</h4>
          <Row gutter={20}>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="Specialization"
                name="specialization"
                rules={[{ required: true, message: 'Please input your specialization!' }]}
              >
                <Input placeholder="Your specialization" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="Experience"
                name="experience"
                rules={[{ required: true, message: 'Please input your experience!' }]}
              >
                <Input placeholder="Your experience" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="Fees Per Consultation"
                name="feesPerConsultation"
                rules={[{ required: true, message: 'Please input your fees per consultation!' }]}
              >
                <Input placeholder="Your fees per consultation" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="Timings"
                name="timings"
                rules={[{ required: true, message: 'Please select your available timings!' }]}
              >
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Button type="primary" htmlType="submit" className="form-btn">
                Update
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Layout>
  );
};

export default Profile;
