import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";

function EditApplication() {
  const { applicationId } = useParams();
  const [data, setData] = useState({
    applicationId: "",
    recipientId: {
      recipientId: "",
      userId: {
        userId: "",
        userName: "",
        email: "",
        dateOfBirth: "",
        gender: "",
        password: ""
      },
      recipientName: "",
      contactNo: "",
      dateOfAvailabity: "",
      organNeeded: "",
      address: "",
      medicalCondition: "",
      status: "pending"
    },
    bloodGroup: "",
    status: "pending",
    age: "",
    details: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:7878/application/${applicationId}`)
      .then((response) => {
        console.log(JSON.stringify(response.data, null, 2)); 
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, [applicationId]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const [field, nestedField] = id.split('.');

    if (nestedField) {
      setData(prevData => ({
        ...prevData,
        [field]: {
          ...prevData[field],
          [nestedField]: value
        }
      }));
    } else {
      setData(prevData => ({
        ...prevData,
        [id]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("http://localhost:7878/application", data)
      .then((res) => {
        alert("Application Updated Successfully");
        navigate("/viewApplication");
      })
      .catch((err) => console.log(err));
  };

  return (
    <><Header />
    <div className="add-application-page">
      <div className="add-application-container">
        <h2 className="add-application-title">UPDATE Application</h2>
        <form onSubmit={handleSubmit} className="add-application-form">
          <div className="add-application-group">
            <label htmlFor="applicationId">Application Id:</label>
            <input
              id="applicationId"
              type="number"
              value={data.applicationId}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div className="add-application-group">
            <label htmlFor="recipientId.recipientId">Recipient Id:</label>
            <input
              id="recipientId.recipientId"
              type="number"
              value={data.recipientId.recipientId}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div className="add-application-group">
            <label htmlFor="bloodGroup">Blood Group:</label>
            <input
              id="bloodGroup"
              type="text"
              value={data.bloodGroup}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div className="add-application-group">
            <label htmlFor="age">Age :</label>
            <input
              id="age"
              type="text"
              value={data.age}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div className="add-application-group">
            <label htmlFor="status">Status:</label>
            <input
              id="status"
              type="text"
              value={data.status}
              onChange={handleChange}
            />
          </div>

          <div className="add-application-group">
            <label htmlFor="details">Details:</label>
            <input
              id="details"
              type="text"
              value={data.details}
              onChange={handleChange}
              readOnly
            />
          </div>

          <button
            type="submit"
            className="add-application-submit"
          >
            Update Application
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default EditApplication;
