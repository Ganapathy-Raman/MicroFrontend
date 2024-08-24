import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";

function EditDonateOrgan() {
  const { donationId } = useParams();
  const [data, setData] = useState({
    donationId: '',
    donorId: {
      donorId: '',
      userId: {
        userId: '',
        userName: '',
        email: '',
        role: '',
        dateOfBirth: '',
        gender: '',
        password: ''
      },
      donorName: '',
      dateOfBirth: '',
      gender: '',
      address: '',
      contactNo: '',
      medicalHistory: '',
      status: ''
    },
    organType: '',
    donationDate: '',
    recipientId: {
      recipientId: '',
      recipientName: '',
      contactNo: '',
      dateOfBirth: '',
      gender: '',
      address: '',
      medicalCondition: '',
      registrationDate: ''
    },
    status: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:7878/organDonation/${donationId}`)
      .then((response) => {
        console.log(JSON.stringify(response.data, null, 2));
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, [donationId]);

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
    axios.put("http://localhost:7878/organDonation", data)
      .then((res) => {
        alert("Organ Donation Updated Successfully");
        navigate("/viewDonateOrgan");
      })
      .catch((err) => console.log(err));
  };

  return (
    <><Header />
    <div className="add-organ-page">
      <div className="add-organ-container">
        <h2 className="add-organ-title">UPDATE Organ Donation</h2>
        <form onSubmit={handleSubmit} className="add-organ-form">
          <div className="add-organ-group">
            <label htmlFor="donationId">Donation Id:</label>
            <input
              id="donationId"
              type="number"
              value={data.donationId}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div className="add-organ-group">
            <label htmlFor="donorId.donorId">Donor Id:</label>
            <input
              id="donorId.donorId"
              type="number"
              value={data.donorId.donorId}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div className="add-organ-group">
            <label htmlFor="organType">Organ Type:</label>
            <input
              id="organType"
              type="text"
              value={data.organType}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div className="add-organ-group">
            <label htmlFor="donationDate">Donation Date:</label>
            <input
              id="donationDate"
              type="date"
              value={data.donationDate}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div className="add-organ-group">
            <label htmlFor="recipientId.recipientId">Recipient Id:</label>
            <input
              id="recipientId.recipientId"
              type="number"
              value={data.recipientId.recipientId}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div className="add-organ-group">
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
            className="add-organ-submit"
          >
            Update Organ Donation
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default EditDonateOrgan;
