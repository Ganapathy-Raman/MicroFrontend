import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";

function EditMedicalRecord() {
  const { recordId } = useParams();
  const [data, setData] = useState({
    recordId: "",
    donorId: {
      donorId: "",
      userId: {
        userId: "",
        userName: "",
        email: "",
        role: "",
        dateOfBirth: "",
        gender: "",
        password: ""
      },
      donorName: "",
      dateOfBirth: "",
      gender: "",
      address: "",
      contactNo: "",
      medicalHistory: "",
      status: "pending"
    },
    recordDate: "",
    details: "",
    status: "pending"
    
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:7878/medicalRecord/${recordId}`)
      .then((response) => {
        console.log(JSON.stringify(response.data, null, 2)); 
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, [recordId]);

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
    axios.put("http://localhost:7878/medicalRecord", data)
      .then((res) => {
        alert("medicalRecord Updated Successfully");
        navigate("/viewMedicalRecord");
      })
      .catch((err) => console.log(err));
  };

  return (
    <><Header />
    <div className="add-record-page">
      <div className="add-record-container">
        <h2 className="add-record-title">UPDATE Record</h2>
        <form onSubmit={handleSubmit} className="add-record-form">
          <div className="add-record-group">
            <label htmlFor="recordId">Record Id:</label>
            <input
              id="recordId"
              type="number"
              value={data.recordId}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div className="add-record-group">
            <label htmlFor="donorId.donorId">Donor Id:</label>
            <input
              id="donorId.donorId"
              type="number"
              value={data.donorId.donorId}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div className="add-record-group">
            <label htmlFor="bloodGroup">Blood Group :</label>
            <input
              id="bloodGroup"
              type="text"
              value={data.bloodGroup}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div className="add-record-group">
            <label htmlFor="details">details:</label>
            <input
              id="details"
              type="text"
              value={data.details}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div className="add-record-group">
            <label htmlFor="age">Age :</label>
            <input
              id="age"
              type="text"
              value={data.age}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div className="add-record-group">
            <label htmlFor="status">Status:</label>
            <input
              id="status"
              type="text"
              value={data.status}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="add-record-submit"
          >
            Update Record
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default EditMedicalRecord;
