import React from "react";
import { useNavigate } from "react-router-dom";
import profileImage from '../images/doctor.png'
import './DoctorList.css'
// import "bootstrap/dist/css/bootstrap.css";
// import doctorImage from "../images/doctor_image.jpg"; // Make sure this path is correct

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <div
      className="card m-2 doctor-card"
      onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
    >
      <div className="d-flex align-items-center">
        <div className="pbtn profile">
          <img className="image" src={profileImage} alt="profile" />
        </div>
        <span>
          Dr. {doctor.firstName} {doctor.lastName}
        </span>
        <span className="badge bg-info me-2">Select</span>
      </div>
      <div className="card-body">
        <p className="mb-2">
          <span className="badge bg-info me-2"></span>
          <b>+{doctor.phone}</b>
        </p>
        <p className="mb-2">
          <span className="badge bg-success me-2">Experience</span>
          {doctor.experience}
        </p>
        <p className="mb-2">
          <span className="badge bg-warning text-dark me-2">Fees</span>
          {/* <b>Per Consultation:</b> */} ${doctor.feesPerCunsaltation}
        </p>
        <p className="mb-0">
          <span className="badge bg-secondary me-2">Timings</span>
          {doctor.timings[0]} - {doctor.timings[1]}
        </p>
        <p className="mb-2">
          <span className="badge bg-info me-2">Brain</span>
          <span className="badge bg-info me-2">Heart</span>
          <span className="badge bg-info me-2">Kidney</span>
        </p>
      </div>
    </div>
  );
};

export default DoctorList;
