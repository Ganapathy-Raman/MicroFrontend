import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import "./Donor.css";
import UserHeader from "../UserHeader/UserHeader";

function Donor() {
  const [inputData, setInputData] = useState({
    userId: {
      userId: "",
      userName: "",
      email: "",
      dateOfAvailabity: "",
      donate: "",
      password: ""
    },
    donorName: "",
    dateOfAvailabity: "",
    donate: "",
    address: "",
    contactNo: "",
    medicalHistory: "",
    status: "pending"
  });

  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:7878/api/all")
      .then((response) => {
        setRecords(response.data);
      })
      .catch((err) => {
        console.error("Error fetching Users:", err);
      });
  }, []);

  useEffect(() => {
    const sessionUserId = sessionStorage.getItem("id");
    const sessionDonorName = sessionStorage.getItem("username");

    if (sessionUserId) {
      setInputData(prevState => ({
        ...prevState,
        userId: { userId: sessionUserId } 
      }));
      fetchUserData(sessionUserId);
    }

    if (sessionDonorName) {
      setInputData(prevState => ({
        ...prevState,
        donorName: sessionDonorName
      }));
    }
  }, []);

  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:7878/api/${id}`);
      console.log('User data fetched:', response.data);
      setInputData(prevState => ({
        ...prevState,
        userId: response.data
      }));
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  const handleSelectChange = async (e) => {
    const userId = e.target.value;
    console.log(`Selected user ID: ${userId}`);

    if (!userId) {
      setInputData(prevState => ({
        ...prevState,
        userId: {
          userId: "",
          userName: "",
          email: "",
          dateOfAvailabity: "",
          donate: "",
          password: ""
        }
      }));
      return;
    }

    try {
      console.log(userId);
      const response = await axios.get(`http://localhost:7878/api/${userId}`);
      console.log('User data fetched:', response.data);
      setInputData(prevState => ({
        ...prevState,
        userId: response.data
      }));
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  useEffect(() => {
    console.log('Updated inputData:', inputData);
  }, [inputData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateValues(inputData);
  
    if (Object.keys(validationErrors).length === 0) {
      const formData = new FormData();
      formData.append('userId', inputData.userId.userId);
      formData.append('donorName', inputData.donorName);
      formData.append('dateOfAvailabity', inputData.dateOfAvailabity);
      formData.append('donate', inputData.donate);
      formData.append('address', inputData.address);
      formData.append('contactNo', inputData.contactNo);
      formData.append('status', inputData.status);
      if (inputData.medicalHistory instanceof File) {
        formData.append('medicalHistory', inputData.medicalHistory);
      }
      
      try {
        const response = await axios.post("http://localhost:7878/donor", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
        console.log('Donor details posted successfully:', response.data);
        const emailData = new FormData();
        emailData.append('from', 'noreply@yourdomain.com'); 
        emailData.append('to', 'ganapathyraman5176737@gmail.com'); 
        emailData.append('subject', 'Donor Registration Successful');
        emailData.append('body', `
          <h1>Registration Successful</h1>
          <p>Dear ${inputData.donorName},</p>
          <p>Your registration as a donor has been successful.</p>
          <p>Details:</p>
          <ul>
            <li>Name: ${inputData.donorName}</li>
            <li>Date of Birth: ${inputData.dateOfAvailabity}</li>
            <li>Donate: ${inputData.donate}</li>
            <li>Address: ${inputData.address}</li>
            <li>Contact No: ${inputData.contactNo}</li>
          </ul>
          <p>Thank you for your contribution.</p>
        `);
  
        if (inputData.medicalHistory instanceof File) {
          emailData.append('attachment', inputData.medicalHistory);
        }
  
        try {
          await axios.post("http://localhost:7878/donor/sendEmail", emailData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log('Email sent successfully');
          setOpen(true); 
        } catch (emailError) {
          console.error("Error sending email:", emailError);
          setMessage('Failed to send email');
        }
        
      } catch (error) {
        console.error("Error posting donor details:", error);
        setMessage('Donor registration failed');
      }
    } else {
      setErrors(validationErrors);
    }
  };
  

  const validateValues = (data) => {
    const errors = {};
    
    if (!data.userId.userId) errors.userId = "Please select a user id";
    if (!data.donorName.trim()) errors.donorName = "Please enter donor name";
    if (!data.dateOfAvailabity.trim()) errors.dateOfAvailabity = "Please enter date of birth";
    if (!data.donate.trim()) errors.donate = "Please enter donate";
    if (!data.address.trim()) errors.address = "Please enter address";
    if (!data.contactNo.trim()) errors.contactNo = "Please enter contact number";
    
    if (!(data.medicalHistory instanceof File) && !data.medicalHistory.trim()) {
      errors.medicalHistory = "Please enter medical history";
    }
    
    if (!data.status.trim()) errors.status = "Status should be pending";
  
    return errors;
  };

  const handleDashboardNavigation = () => {
    navigate('/donorDashboard', { state: { donorData: inputData } }); 
    setOpen(false); 
  };

  return (
    <>
    <UserHeader />
    <div className="add-donor-page">
      {message && <div className="add-donor-alert">{message}</div>}
      <div className="add-donor-container">
        <h2 className="add-donor-title">Donor Registration</h2>
        <form onSubmit={handleSubmit} className="add-donor-form">
          <div className="add-donor-group">
            <label htmlFor="userId">User Id:</label>
            <select
              id="userId"
              value={inputData.userId.userId || ''}
              onChange={handleSelectChange}
              className="form-control"
            >
              <option value="">Select a record</option>
              {records.map((record) => (
                <option key={record.userId} value={record.userId}>
                  {record.userId}
                </option>
              ))}
            </select>
            {errors.userId && <p className="add-donor-error">{errors.userId}</p>}
          </div>
          <div className="add-donor-group">
            <label htmlFor="donorName" role = "donorName">Donor Name:</label>
            <input
              id="donorName"
              type="text"
              value={inputData.donorName}
              onChange={(e) => setInputData({ ...inputData, donorName: e.target.value })}
            />
            {errors.donorName && <p className="add-donor-error">{errors.donorName}</p>}
          </div>

          <div className="add-donor-group">
            <label htmlFor="dateOfAvailabity">Date Of Availability :</label>
            <input
              id="dateOfAvailabity"
              type="date"
              value={inputData.dateOfAvailabity}
              onChange={(e) => setInputData({ ...inputData, dateOfAvailabity: e.target.value })}
            />
            {errors.dateOfAvailabity && <p className="add-donor-error">{errors.dateOfAvailabity}</p>}
          </div>

          <div className="add-donor-group">
            <label htmlFor="donate">Donate:</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  id="donate-organ"
                  name="donate"
                  value="organ"
                  checked={inputData.donate === 'organ'}
                  onChange={(e) => setInputData({ ...inputData, donate: e.target.value })}
                  className="radio-input"
                />
                <span className="radio-custom"></span>
                <span> Organ</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  id="donate-tissue"
                  name="donate"
                  value="tissue"
                  checked={inputData.donate === 'tissue'}
                  onChange={(e) => setInputData({ ...inputData, donate: e.target.value })}
                  className="radio-input"
                />
                <span className="radio-custom"></span>
                <span> Tissue</span>
              </label>
            </div>
            {errors.donate && <p className="add-donor-error">{errors.donate}</p>}
          </div>

          <div className="add-donor-group">
            <label htmlFor="address" role="address">Address:</label>
            <input
              id="address"
              type="text"
              value={inputData.address}
              onChange={(e) => setInputData({ ...inputData, address: e.target.value })}
            />
            {errors.address && <p className="add-donor-error">{errors.address}</p>}
          </div>

          <div className="add-donor-group">
            <label htmlFor="contactNo">Contact No:</label>
            <input
              id="contactNo"
              type="tel"
              value={inputData.contactNo}
              onChange={(e) => setInputData({ ...inputData, contactNo: e.target.value })}
            />
            {errors.contactNo && <p className="add-donor-error">{errors.contactNo}</p>}
          </div>

          <div className="add-donor-group">
            <label htmlFor="medicalHistory">Medical History:</label>
            <input
              id="medicalHistory"
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                setInputData(prevState => ({
                  ...prevState,
                  medicalHistory: file
                }));
              }}
            />
            {errors.medicalHistory && <p className="add-donor-error">{errors.medicalHistory}</p>}
          </div>

          

          <div className="input-group checkbox-group">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label htmlFor="rememberMe">I Acknowledge the terms and condition for the donation</label>
                    </div>

          <button type="submit" className="add-donor-submit">
            Register
          </button>
        </form>
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
          <Dialog.Content className="fixed top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] bg-white p-6 rounded shadow-lg w-full max-w-lg mx-auto">
          <center><img src="https://www.freeiconspng.com/thumbs/success-icon/success-icon-10.png" alt="Success Logo" className="success-logo" /></center><br />
            <Dialog.Title className="text-lg font-semibold text-gray-800">
              Successfully Registered!
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-gray-600">
              The donor has been successfully registered.
            </Dialog.Description>
            <div className="mt-4 flex gap-2 justify-end">
              <Dialog.Close asChild>
                <button
                  className="py-2 px-4 bg-blue-600 text-white rounded"
                  onClick={handleDashboardNavigation} 
                >
                  Next Step
                </button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <button
                  className="py-2 px-4 bg-gray-300 text-gray-800 rounded"
                >
                  Close
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
    </>
  );
}

export default Donor;