import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Dialog from '@radix-ui/react-dialog';
import './MedicalRecord.css';
import UserHeader from "../UserHeader/UserHeader";

const MedicalRecord = () => {
  
  const [inputData, setInputData] = useState({
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
    bloodGroup: "",
    status: "pending",
    age: "",
    details: ""
  });

  const [donors, setDonors] = useState([]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId =sessionStorage.getItem("id");
    const fetchDonorData = async () => {
        try {
            const response = await axios.get(`http://localhost:7878/donor/user/${userId}`);
            console.log("UserID Fetched", response.data);
            console.log(response.data);
            console.log(response.data);
            setInputData(prevState => ({
                ...prevState,
                donorId: response.data
            }));
        } catch (err) {
            console.error("Error fetching donor data:", err);

        }
    };

    fetchDonorData();
}, []);

  useEffect(() => {
    axios.get("http://localhost:7878/donor/all")
      .then(response => setDonors(response.data))
      .catch(err => console.error("Error fetching donors:", err));
  }, []);

  const handleDonorSelectChange = async (e) => {
    const donorId = e.target.value;
    if (!donorId) {
      setInputData(prevState => ({
        ...prevState,
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
        }
      }));
      return;
    }
    // try {
    //   const response = await axios.get(`http://localhost:7878/donor/${userId}`);
    //   console.log("UserID Fetched" ,response.data);
    //   setInputData(prevState => ({
    //     ...prevState,
    //     donorId: response.data
    //   }));
    // } catch (err) {
    //   console.error("Error fetching donor data:", err);
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateValues(inputData);
    if (Object.keys(validationErrors).length === 0) {
      axios.post("http://localhost:7878/medicalRecord", inputData)
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
    if (!data.donorId.donorId) errors.donorId = "Please select a donor ID";
    if (!data.bloodGroup.trim()) errors.bloodGroup = "Please enter blood group";
    if (!data.age.trim()) errors.age = "Please enter blood group";
    if (!data.details.trim()) errors.details = "Please enter details";
    if (!data.status.trim()) errors.status = "Please enter status";
    return errors;
  };

  const handleDashboardNavigation = () => {
    navigate('/userDashboard', { state: { donorData: inputData } });
    setOpen(false);
  };

  return (
    <>
      <UserHeader />
      <div className="add-record-page">
        {message && <div className="add-record-alert">{message}</div>}
        <div className="add-record-container">
          <h2 className="add-record-title">Upload Medical Record</h2>
          <form onSubmit={handleSubmit} className="add-record-form">
          <div className="add-record-group">
                <label htmlFor="donorId">Donor Id : </label>
                <input
                    type="num"
                    id="donorId"
                    name="donorId"
                    value={inputData.donorId.donorId}
                    onChange={handleDonorSelectChange}

                />
            </div>

            <div className="add-record-group">
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
              {errors.bloodGroup && <p className="add-record-error">{errors.bloodGroup}</p>}
            </div>

            <div className="add-record-group">
              <label htmlFor="age">Age:</label>
              <input
                id="age"
                type="age"
                value={inputData.age}
                onChange={(e) => setInputData({ ...inputData, age: e.target.value })}
              />
              {errors.age && <p className="add-donor-error">{errors.age}</p>}
            </div>

            <div className="add-record-group">
              <label htmlFor="details">Are you having sugar or pressure ?
              <br />
              if yes please mention!
              </label>
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
              className="add-record-submit"
            >
              Upload Record
            </button>
          </form>
        </div>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
            <Dialog.Content className="fixed top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] bg-white p-6 rounded shadow-lg w-full max-w-lg mx-auto">
              <Dialog.Title className="text-lg font-semibold text-gray-800">
                <center><img src="https://www.freeiconspng.com/thumbs/success-icon/success-icon-10.png" alt="Success Logo" className="success-logo" /></center><br />
                ohoo! yor organ donation process is completed!
                Thanks for your willingness to donate organ! 
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

export default MedicalRecord;
