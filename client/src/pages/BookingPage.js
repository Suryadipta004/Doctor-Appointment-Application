import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import './BookingPage.css'; // Import the custom CSS file

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState();
  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/booking-availbility",
        { doctorId: params.doctorId, date, time },
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
    }
  };

  const handleBooking = async () => {
    try {
      if (!date || !time) {
        return alert("Date & Time Required");
      }
      dispatch(showLoading());

      const roomID = `${params.doctorId}-${user._id}-${moment(date + ' ' + time, 'DD-MM-YYYY HH:mm').format('YYYYMMDDHHmm')}`;

      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          time: time,
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

        // Navigate to the video call room
        navigate(`/room/${roomID}`);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <div className="container mt-5">
        {doctors && (
          <div className="animate__animated animate__fadeInUp">
            <h3 className="text-center text-primary mb-4">Book Your Appointment</h3>
            <p className="text-center text-muted mb-4">
              Schedule an appointment with Dr. {doctors.firstName} {doctors.lastName}. Choose a date and time that suits you best.
            </p>
            <div className="card booking-card shadow-lg p-4">
              <div className="doctor-info mb-4">
                <h4 className="text-secondary">
                  <i className="fas fa-user-md"></i> Dr. {doctors.firstName} {doctors.lastName}
                </h4>
                <h5 className="text-info">
                  <i className="fas fa-dollar-sign"></i> Fees: ${doctors.feesPerCunsaltation}
                </h5>
                <h5 className="text-info">
                  <i className="fas fa-clock"></i> Available Timings: {doctors.timings && doctors.timings[0]} - {doctors.timings && doctors.timings[1]}
                </h5>
              </div>
              <div className="booking-form d-flex flex-column align-items-center">
                <DatePicker
                  aria-required="true"
                  className="form-control m-2 date-picker"
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    setDate(moment(value).format("DD-MM-YYYY"));
                  }}
                />
                <TimePicker
                  aria-required="true"
                  format="HH:mm"
                  className="form-control mt-3 time-picker"
                  onChange={(value) => {
                    setTime(moment(value).format("HH:mm"));
                  }}
                />
                <button
                  className="btn btn-primary mt-3 shadow"
                  onClick={handleAvailability}
                >
                  Check Availability
                </button>
                <button
                  className="btn btn-dark mt-3 shadow"
                  onClick={handleBooking}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
