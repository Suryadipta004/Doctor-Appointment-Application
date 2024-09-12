import React from "react";
import "../styles/RegiserStyles.css";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import regImage from "../images/Signup_page_image.png"

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      dispatch(hideLoading());

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <div className="form-container">
      <Form
        layout="vertical"
        onFinish={onfinishHandler}
        className="register-form"
      >
      {/* <div className="image-section">
        <img src={regImage} alt="Register" />
      </div> */}
        <h3 className="text-center">Login Form</h3>

        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true }]}
        >
          <Input type="password" />
        </Form.Item>

        <Link to="/register" className="m-2">
          Not a user? Register here
        </Link>

        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </Form>
    </div>
  );
};

export default Login;
