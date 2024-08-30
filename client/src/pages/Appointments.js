import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import moment from "moment";
import { Table, Tag, Card, Typography } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import './Appointments.css'; // Ensure to create this CSS file

const { Title } = Typography;

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/user/user-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      render: text => <Tag color="blue">{text}</Tag>
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          <Tag color="geekblue">{moment(record.date).format("DD-MM-YYYY")}</Tag>
          <Tag color="purple">{moment(record.time).format("HH:mm")}</Tag>
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: status => {
        let color = status === "Completed" ? "green" : status === "Pending" ? "gold" : "red";
        let icon = status === "Completed" ? <CheckCircleOutlined /> : status === "Pending" ? <ClockCircleOutlined /> : <CloseCircleOutlined />;
        return (
          <Tag icon={icon} color={color}>
            {status.toUpperCase()}
          </Tag>
        );
      }
    },
  ];

  return (
    <Layout>
      <Card className="appointments-card">
      <Title level={2} className="text-center">
          Appointments List
          <p className="subtitle">Manage your scheduled appointments</p>
        </Title>
      <Table columns={columns} dataSource={appointments} className="appointments-table" />
      </Card>
    </Layout>
  );
};

export default Appointments;
