import React from "react";
import Layout from "./../components/Layout";
import { message, Tabs, Button, Empty } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './NotificationPage.css';


const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  // handle read notification
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  // delete notifications
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong in notifications");
    }
  };

  return (
    <Layout>
      <h4 className="notification-heading">Notification Page</h4>
      <Tabs defaultActiveKey="0">
        <Tabs.TabPane tab="Unread" key="0">
          <div className="d-flex justify-content-end mb-3">
            <Button type="primary" onClick={handleMarkAllRead}>
              Mark All Read
            </Button>
          </div>
          {user?.notifcation.length > 0 ? (
            user.notifcation.map((notificationMgs, index) => (
              <div
                className="card mb-3"
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(notificationMgs.onClickPath)}
              >
                <div className="card-body">{notificationMgs.message}</div>
              </div>
            ))
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key="1">
          <div className="d-flex justify-content-end mb-3">
            <Button type="danger" onClick={handleDeleteAllRead}>
              Delete All Read
            </Button>
          </div>
          {user?.seennotification.length > 0 ? (
            user.seennotification.map((notificationMgs, index) => (
              <div
                className="card mb-3"
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(notificationMgs.onClickPath)}
              >
                <div className="card-body">{notificationMgs.message}</div>
              </div>
            ))
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default NotificationPage;
