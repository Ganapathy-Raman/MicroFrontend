import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Dialog from '@radix-ui/react-dialog';
import './Application.css';
import UserHeader from "../UserHeader/UserHeader";

const Application = () => {
  const [inputData, setInputData] = useState({
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

  const [recipients, setRecipients] = useState([]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = sessionStorage.getItem("id");
    const fetchRecipientData = async () => {
      try {
        const response = await axios.get(`http://localhost:7878/recipient/user/${userId}`);
        console.log("UserID Fetched", userId);
        console.log(response.data);
        console.log(response.data);
        setInputData(prevState => ({
          ...prevState,
          recipientId: response.data
        }));
      } catch (err) {
        console.error("Error fetching recipient data:", err);

      }
    };

    fetchRecipientData();
  }, []);

  useEffect(() => {
    axios.get("http://localhost:7878/recipient/all")
      .then(response => {setRecipients(response.data)})
      .catch(err => console.error("Error fetching recipients:", err));
  }, []);

  const handleRecipientSelectChange = async (e) => {
    const recipientId = e.target.value;
    if (!recipientId) {
      setInputData(prevState => ({
        ...prevState,
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
        }
      }));
      return;
    }
    // try {
    //   const response = await axios.get(`http://localhost:7878/recipient/${recipientId}`);
    //   setInputData(prevState => ({
    //     ...prevState,
    //     recipientId: response.data
    //   }));
    // } catch (err) {
    //   console.error("Error fetching recipient data:", err);
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateValues(inputData);
    if (Object.keys(validationErrors).length === 0) {
      axios.post("http://localhost:7878/application", inputData)
        .then(res => {
          setOpen(true);
          console.log(res.data);
        })
        .catch(err => {
          console.error("Error adding medicalRecord:", err);
          setMessage('medicalRecord registration failed');
        });
    } else {
      setErrors(validationErrors);
    }
  };

  const validateValues = (data) => {
    const errors = {};
    if (!data.recipientId.recipientId) errors.recipientId = "Please select a donor ID";
    if (!data.bloodGroup.trim()) errors.bloodGroup = "Please enter blood group";
    if (!data.age.trim()) errors.age = "Please enter blood group";
    if (!data.details.trim()) errors.details = "Please enter details";
    if (!data.status.trim()) errors.status = "Please enter status";
    return errors;
  };

  const handleDashboardNavigation = () => {
    navigate('/userDashboard', { state: { applicationData: inputData } });
    setOpen(false);
  };

  return (
    <>
      <UserHeader />
      <div className="add-application-page">
        {message && <div className="add-application-alert">{message}</div>}
        <div className="add-application-container">
          <h2 className="add-application-title">Upload Application</h2>
          <form onSubmit={handleSubmit} className="add-application-form">
            {/* <div className="add-application-group">
              <label htmlFor="recipientId">Recipient ID:</label>
              <select
                id="recipientId"
                value={inputData.recipientId.recipientId}
                onChange={handleRecipientSelectChange}
                className="form-control"
              >
                <option value="">Select a recipient</option>
                {recipients.map(recipient => (
                  <option key={recipient.recipientId} value={recipient.recipientId}>
                    {recipient.recipientId}
                  </option>
                ))}
              </select>
              {errors.recipientId && <p className="add-donor-error">{errors.recipientId}</p>}
            </div> */}

            <div className="add-application-group">
              <label htmlFor="recipientId">Recipient Id : </label>
              <input
                type="num"
                id="recipientId"
                name="recipientId"
                value={inputData.recipientId.recipientId}
                onChange={handleRecipientSelectChange}

              />
            </div>

            <div className="add-application-group">
              <label htmlFor="bloodGroup">Blood Group:</label>
              <select
                id="bloodGroup"
                value={inputData.bloodGroup}
                onChange={(e) => setInputData({ ...inputData, bloodGroup: e.target.value })}
                className="form-control"
              >
                <option value="">Select an Blood Group</option>
                <option value="B+ve">B+ve</option>
                <option value="O+ve">O+ve</option>
                <option value="O-ve">O-ve</option>
                <option value="A+ve">A+ve</option>
                <option value="AB+ve">AB+ve</option>
                <option value="AB-ve">AB-ve</option>
                <option value="B-ve">B-ve</option>
                <option value="A-ve">A-ve</option>
              </select>
              {errors.bloodGroup && <p className="add-application-error">{errors.bloodGroup}</p>}
            </div>

            <div className="add-application-group">
              <label htmlFor="age">Age:</label>
              <input
                id="age"
                type="age"
                value={inputData.age}
                onChange={(e) => setInputData({ ...inputData, age: e.target.value })}
              />
              {errors.age && <p className="add-donor-error">{errors.age}</p>}
            </div>

            <div className="add-application-group">
              <label htmlFor="details">If you have pressure or sugar? <br /> If please mention:</label>
              <input
                id="details"
                type="text"
                value={inputData.details}
                onChange={(e) => setInputData({ ...inputData, details: e.target.value })}
              />
              {errors.details && <p className="add-donor-error">{errors.details}</p>}
            </div>
            <button
              type="submit"
              className="add-application-submit"
            >
              Upload Application
            </button>
          </form>
        </div>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
            <Dialog.Content className="fixed top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] bg-white p-6 rounded shadow-lg w-full max-w-lg mx-auto">
              <Dialog.Title className="text-lg font-semibold text-gray-800">
                <center><img src="https://www.freeiconspng.com/thumbs/success-icon/success-icon-10.png" alt="Success Logo" className="success-logo" /></center><br />
                Your recipient application process is completed!
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-gray-600">
              </Dialog.Description>
              <div className="mt-4 flex gap-2 justify-end">
                <Dialog.Close asChild>
                  <button
                    className="py-2 px-4 bg-blue-600 text-white rounded"
                    onClick={handleDashboardNavigation}
                  >
                    Back to home
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
};

export default Application;
