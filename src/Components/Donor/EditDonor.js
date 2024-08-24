import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFilePdf, faFileImage, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import Header from "../Header/Header";

function EditDonor() {
  const { donorId } = useParams();
  const [data, setData] = useState({
    donorId: '',
    userId: {
      userId: '',
      userName: '',
      email: '',
      dateOfBirth: '',
      gender: '',
      password: ''
    },
    donorName: '',
    dateOfAvailabity: '',
    donate: '',
    address: '',
    contactNo: '',
    medicalHistory: '',
    status: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:7878/donor/${donorId}`)
      .then((response) => {
        console.log(JSON.stringify(response.data, null, 2)); 
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, [donorId]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id.startsWith('userId')) {
      setData(prevData => ({
        ...prevData,
        userId: {
          ...prevData.userId,
          [id]: value
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
    axios
      .put("http://localhost:7878/donor", data)
      .then((res) => {
        alert("Donor Updated Successfully");
        navigate("/viewDonor");
      })
      .catch((err) => console.log(err));
  };

  const viewMd = (medicalHistory) =>{
    if(medicalHistory){
      Swal.fire({
        title: 'Medical History',
        imageUrl:`data:image/jpg;base64,${medicalHistory}`,
        imageWidth: 400,
        imageHeight: 300,
        imageAlt:"Id"
      });
    }
  };
  const getFileIcon = (fileType) => {
    const defaultIcon = faFileAlt;
 
    if (fileType && fileType.includes('image')) {
      return faFileImage;
    } else if (fileType && fileType.includes('pdf')) {
      return faFilePdf;
    } else {
      return defaultIcon;
    }
  };

  return (
    <><Header />
    <div className="add-donor-page">
      <div className="add-donor-container">
        <h2 className="add-donor-title">UPDATE DONOR</h2>
        <form onSubmit={handleSubmit} className="add-donor-form">
          <div className="add-donor-group">
            <label htmlFor="donorId">Donor Id:</label>
            <input
              id="donorId"
              type="number"
              value={data.donorId}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div className="add-donor-group">
            <label htmlFor="userId">User Id:</label>
            <input
              id="userId.userId"
              type="number"
              value={data.userId.userId}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div className="add-donor-group">
            <label htmlFor="userName">User Name:</label>
            <input
              id="userName"
              type="text"
              value={data.userId.userName}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div className="add-donor-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={data.userId.email}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div className="add-donor-group">
            <label htmlFor="dateOfAvailabity">Date Of Availability:</label>
            <input
              id="dateOfAvailabity"
              type="date"
              value={data.dateOfAvailabity}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div className="add-donor-group">
            <label htmlFor="donate">Donate :</label>
            <input
              id="donate"
              type="text"
              value={data.donate}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div className="add-donor-group">
            <label htmlFor="address">Address:</label>
            <input
              id="address"
              type="text"
              value={data.address}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div className="add-donor-group">
            <label htmlFor="contactNo">Contact No:</label>
            <input
              id="contactNo"
              type="tel"
              value={data.contactNo}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div className="add-donor-group">
            <label htmlFor="medicalHistory">Medical History:</label>
            <button onClick={() => viewMd(data.medicalHistory)}>
                    <FontAwesomeIcon icon={getFileIcon(data.medicalHistory)} size="lg" />
                  </button>
          </div>

          <div className="add-donor-group">
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
            className="add-donor-submit"
          >
            Update Donor
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default EditDonor;
