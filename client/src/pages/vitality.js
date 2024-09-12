import React from "react";
import { Form, Input, Button, message, Card } from "antd";
import { useSelector } from "react-redux";
import Layout from "./../components/Layout";
import { database } from './firebaseConfig.js'; // Import the configured database
import { ref, update } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import health_image from "../images/doctor-application.gif";
import "./Vitality.css"; // Importing CSS file

const Vitality = () => {
  const { user } = useSelector((state) => state.user);

  const handleFinish = async (values) => {
    try {
      const { age, gender , chestPain, bloodSugar, cholestrol, restingECG, angina } = values;

      // Save the data to Firebase
      await update(ref(database, `Sensor/${user?.name}`), {
        age,
        gender,
        chestPain,
        // restingBP,
        bloodSugar,
        cholestrol,
        restingECG,
        angina,
      });

      message.success("Vitality data saved successfully!");
    } catch (error) {
      console.error("Error saving vitality data:", error);
      message.error("Something went wrong!");
    }
  };

  return (
    <Layout>
      <Card className="vitality-card" hoverable>
        {/* <h2 className="vitality-title">Health Vitality Form</h2>
        <p className="vitality-subtitle">Please fill in your health data accurately</p>
         */}
        {/* Add image above the form for visual appeal */}
        <div>
          <img src={health_image} alt="Health Icon" className="health-icon" />
        </div>
        <Form
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            chestPain: "",
            // restingBP: "",
            bloodSugar: "",
            cholestrol: "",
            restingECG: "",
            angina: "",
            age: "",
            gender: "",
          }}
          className="vitality-form"
        >

          {/* Age Input Field with image */}
          <div className="input-field">
            <label htmlFor="age">
              Age:
            </label>
            <Form.Item name="age" rules={[{ required: true, message: "Please input your age" }]}>
              <Input type="number" id="age" placeholder="Enter your age" />
            </Form.Item>
          </div>

          {/* Gender Input Field with image */}
          <div className="input-field">
            <label htmlFor="gender">
             Gender:
            </label>
            <Form.Item name="gender" rules={[{ required: true, message: "Please select your gender" }]}>
              <select id="gender" required>
                <option value="" disabled>Choose your option</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </Form.Item>
          </div>

          {/* Chest Pain Input Field with image */}
          <div className="input-field">
            <label htmlFor="chest_pain">
              Chest Pain:
            </label>
            <Form.Item name="chestPain" rules={[{ required: true }]}>
              <select id="chest_pain" required>
                <option value="" disabled>Choose your option</option>
                <option value="asy">ASY</option>
                <option value="ata">ATA</option>
                <option value="nap">NAP</option>
                <option value="ta">TA</option>
              </select>
            </Form.Item>
          </div>

          {/* Resting BP Input Field with image */}
          {/* <div className="input-field">
            <label htmlFor="resting_bp">
              Resting BP:
            </label>
            <Form.Item name="restingBP" rules={[{ required: true }]}>
              <Input type="text" id="resting_bp" placeholder="Enter resting BP" />
            </Form.Item>
          </div> */}

          {/* Blood Sugar Input Field with image */}
          <div className="input-field">
            <label htmlFor="Blood_Sugar">
              Blood Sugar:
            </label>
            <Form.Item name="bloodSugar" rules={[{ required: true }]}>
              <select id="Blood_Sugar" required>
                <option value="" disabled>Choose your option</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </Form.Item>
          </div>

          {/* Cholestrol Input Field with image */}
          <div className="input-field">
            <label htmlFor="cholestrol">
              Cholestrol:
            </label>
            <Form.Item name="cholestrol" rules={[{ required: true }]}>
              <Input type="text" id="cholestrol" placeholder="Enter cholesterol level" />
            </Form.Item>
          </div>

          {/* Resting ECG Input Field with image */}
          <div className="input-field">
            <label htmlFor="resting_ecg">
              Resting ECG:
            </label>
            <Form.Item name="restingECG" rules={[{ required: true }]}>
              <select id="resting_ecg" required>
                <option value="" disabled>Choose your option</option>
                <option value="st">ST</option>
                <option value="normal">Normal</option>
              </select>
            </Form.Item>
          </div>

          {/* Angina Input Field with image */}
          <div className="input-field">
            <label htmlFor="angina">
              Exercise Angina:
            </label>
            <Form.Item name="angina" rules={[{ required: true }]}>
              <select id="angina" required>
                <option value="" disabled>Choose your option</option>
                <option value="N">No</option>
                <option value="Y">Yes</option>
              </select>
            </Form.Item>
          </div>

          <Button type="primary" htmlType="submit" className="vitality-submit-btn">
            Submit Data
          </Button>
        </Form>
      </Card>
    </Layout>
  );
};

export default Vitality;
