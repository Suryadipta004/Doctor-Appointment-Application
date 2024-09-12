import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import moment from "moment";
import { message, Table, Button, Spin } from "antd";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/doctor/doctor-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      } else {
        message.error("Failed to fetch appointments.");
      }
    } catch (error) {
      console.log(error);
      message.error("An error occurred while fetching appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/update-status",
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      } else {
        message.error("Failed to update appointment status.");
      }
    } catch (error) {
      console.log(error);
      message.error("An error occurred while updating status.");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div>
          {record.status === "pending" && (
            <div>
              <Button
                type="primary"
                onClick={() => handleStatus(record, "approved")}
              >
                Approve
              </Button>
              <Button
                type="danger"
                onClick={() => handleStatus(record, "reject")}
                style={{ marginLeft: 8 }}
              >
                Reject
              </Button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1>Appointments List</h1>
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={appointments}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
        />
      )}
    </Layout>
  );
};

export default DoctorAppointments;
