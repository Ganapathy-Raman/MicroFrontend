import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import "./Recipient.css";
import UserHeader from "../UserHeader/UserHeader";

function Recipient() {
  const [inputData, setInputData] = useState({
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
    const sessionRecipientName = sessionStorage.getItem("username");

    if (sessionUserId) {
      setInputData(prevState => ({
        ...prevState,
        userId: { userId: sessionUserId } 
      }));
      fetchUserData(sessionUserId);
    }

    if (sessionRecipientName) {
      setInputData(prevState => ({
        ...prevState,
        recipientName: sessionRecipientName
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
          dateOfBirth: "",
          gender: "",
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
      formData.append('recipientName', inputData.recipientName);
      formData.append('dateOfAvailabity', inputData.dateOfAvailabity);
      formData.append('contactNo', inputData.contactNo);
      formData.append('organNeeded', inputData.organNeeded);
      formData.append('address', inputData.address);
      formData.append('status', inputData.status);
      if (inputData.medicalCondition instanceof File) {
        formData.append('medicalCondition', inputData.medicalCondition);
      }
      
      try {
        const response = await axios.post("http://localhost:7878/recipient", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
        console.log('Recipient details posted successfully:', response.data);
  
        const emailData = new FormData();
        emailData.append('from', 'noreply@yourdomain.com'); 
        emailData.append('to', 'ganapathyraman5176737@gmail.com'); 
        emailData.append('subject', 'Recipient Registration Successful');
        emailData.append('body', `
          <h1>Registration Successful</h1>
          <p>Dear ${inputData.recipientName},</p>
          <p>Your registration as a recipient has been successful.</p>
          <p>Details:</p>
          <ul>
            <li>Name: ${inputData.recipientName}</li>
            <li>Date of Birth: ${inputData.dateOfAvailabity}</li>
            <li>Donate: ${inputData.contactNo}</li>
            <li>Address: ${inputData.address}</li>
            <li>Contact No: ${inputData.organNeeded}</li>
          </ul>
          <p>Thank you for your contribution.</p>
        `);
  
        if (inputData.medicalCondition instanceof File) {
          emailData.append('attachment', inputData.medicalCondition);
        }
  
        try {
          await axios.post("http://localhost:7878/recipient/sendEmail", emailData, {
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
        console.error("Error posting recipient details:", error);
        setMessage('Recipient registration failed');
      }
    } else {
      setErrors(validationErrors);
    }
  };
  

  const validateValues = (data) => {
    const errors = {};
    
    if (!data.userId.userId) errors.userId = "Please select a user id";
    if (!data.recipientName.trim()) errors.recipientName = "Please enter recipient name";
    if (!data.dateOfAvailabity.trim()) errors.dateOfAvailabity = "Please enter date of birth";
    if (!data.organNeeded.trim()) errors.organNeeded = "Please enter organ Needed";
    if (!data.address.trim()) errors.address = "Please enter address";
    if (!data.contactNo.trim()) errors.contactNo = "Please enter contact number";

    if (!(data.medicalCondition instanceof File) && !data.medicalCondition.trim()) {
      errors.medicalCondition = "Please enter medical history";
    }
    
    if (!data.status.trim()) errors.status = "Status should be pending";
  
    return errors;
  };

  const handleDashboardNavigation = () => {
    navigate('/recipientDashboard', { state: { recipientData: inputData } }); 
    setOpen(false); 
  };

  return (
    <>
    <UserHeader />
    <div className="add-recipient-page">
      {message && <div className="add-recipient-alert">{message}</div>}
      <div className="add-recipient-container">
        <h2 className="add-recipient-title">Recipient Registration</h2>
        <form onSubmit={handleSubmit} className="add-recipient-form">
          <div className="add-recipient-group">
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
            {errors.userId && <p className="add-recipient-error">{errors.userId}</p>}
          </div>
          <div className="add-recipient-group">
            <label htmlFor="recipientName">Recipient Name:</label>
            <input
              id="recipientName"
              type="text"
              value={inputData.recipientName}
              onChange={(e) => setInputData({ ...inputData, recipientName: e.target.value })}
            />
            {errors.recipientName && <p className="add-recipient-error">{errors.recipientName}</p>}
          </div>

          <div className="add-recipient-group">
            <label htmlFor="dateOfAvailabity">Date Of Availability :</label>
            <input
              id="dateOfAvailabity"
              type="date"
              value={inputData.dateOfAvailabity}
              onChange={(e) => setInputData({ ...inputData, dateOfAvailabity: e.target.value })}
            />
            {errors.dateOfAvailabity && <p className="add-recipient-error">{errors.dateOfAvailabity}</p>}
          </div>
          <div className="add-recipient-group">
              <label htmlFor="organNeeded">Organ Needed:</label>
              <select
                id="organNeeded"
                value={inputData.organNeeded}
                onChange={(e) => setInputData({ ...inputData, organNeeded: e.target.value })}
                className="form-control"
              >
                <option value="">Select an organ Needed</option>
                <option value="Eye">Eye</option>
                <option value="Kidney">Kidney</option>
                <option value="Liver">Liver</option>
                <option value="Heart">Heart</option>
              </select>
              {errors.organNeeded && <p className="add-donor-error">{errors.organNeeded}</p>}
            </div>


          <div className="add-recipient-group">
            <label htmlFor="address">Address:</label>
            <input
              id="address"
              type="text"
              value={inputData.address}
              onChange={(e) => setInputData({ ...inputData, address: e.target.value })}
            />
            {errors.address && <p className="add-recipient-error">{errors.address}</p>}
          </div>

          <div className="add-recipient-group">
            <label htmlFor="contactNo">Contact No:</label>
            <input
              id="contactNo"
              type="tel"
              value={inputData.contactNo}
              onChange={(e) => setInputData({ ...inputData, contactNo: e.target.value })}
            />
            {errors.contactNo && <p className="add-recipient-error">{errors.contactNo}</p>}
          </div>

          <div className="add-recipient-group">
            <label htmlFor="medicalCondition">Medical Condition:</label>
            <input
              id="medicalCondition"
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                setInputData(prevState => ({
                  ...prevState,
                  medicalCondition: file
                }));
              }}
            />
            {errors.medicalCondition && <p className="add-recipient-error">{errors.medicalCondition}</p>}
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

          <button type="submit" className="add-recipient-submit">
            Register
          </button>
        </form>
      </div>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
          <Dialog.Content className="fixed top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] bg-white p-6 rounded shadow-lg w-full max-w-lg mx-auto">
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
                  Dashboard
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

export default Recipient;