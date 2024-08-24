import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import './DonateOrgan.css';
import UserHeader from "../UserHeader/UserHeader";

const DonateOrgan = () => {
  
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
    organType: "",
    donationDate: "",
    recipientId: {
      recipientId: "",
      recipientName: "",
      contactNo: "",
      dateOfBirth: "",
      gender: "",
      address: "",
      medicalHistory: "",
      registrationDate: ""
    },
    status: "pending"
  });

  const [donors, setDonors] = useState([]);
  const [recipients, setRecipients] = useState([]);
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

  useEffect(() => {
    axios.get("http://localhost:7878/recipient/all")
      .then(response => setRecipients(response.data))
      .catch(err => console.error("Error fetching recipients:", err));

      
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

  const handleRecipientSelectChange = async (e) => {
    const recipientId = e.target.value;
    if (!recipientId) {
      setInputData(prevState => ({
        ...prevState,
        recipientId: {
          recipientId: "",
          recipientName: "",
          contactNo: "",
          dateOfBirth: "",
          gender: "",
          address: "",
          medicalHistory: "",
          registrationDate: ""
        }
      }));
      return;
    }
    try {
      const response = await axios.get(`http://localhost:7878/recipient/${recipientId}`);
      setInputData(prevState => ({
        ...prevState,
        recipientId: response.data
      }));
    } catch (err) {
      console.error("Error fetching recipient data:", err);
    }
  };
  const [data, setData] = useState({
    recipientId: '' // Assuming recipientId is a string or number
  });
  
  // const handleRecipientSelectChange = (e) => {
  //   const selectedRecipientId = e.target.value;
  //   setData(prevState => ({
  //     ...prevState,
  //     recipientId: selectedRecipientId
  //   }));
  // };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateValues(inputData);
    if (Object.keys(validationErrors).length === 0) {
      axios.post("http://localhost:7878/organDonation", inputData)
        .then(res => {
          setOpen(true);
          console.log(res.data);
        })
        .catch(err => {
          console.error("Error adding organDonation:", err);
          setMessage('Organ donation registration failed');
        });
    } else {
      setErrors(validationErrors);
    }
  };

  const validateValues = (data) => {
    const errors = {};
    if (!data.donorId.donorId) errors.donorId = "Please select a donor ID";
    if (!data.organType.trim()) errors.organType = "Please select organ type";
    if (!data.donationDate.trim()) errors.donationDate = "Please enter donation date";
    if (!data.recipientId.recipientId) errors.recipientId = "Please select a recipient ID";
    if (!data.status.trim()) errors.status = "Please enter status";
    return errors;
  };

  const handleDashboardNavigation = () => {
    navigate('/medicalRecord'); 
    setOpen(false);
  };

  return (
    <>
      <UserHeader />
      <div className="add-organ-page">
        {message && <div className="add-organ-alert">{message}</div>}
        <div className="add-organ-container">
          <h2 className="add-organ-title">Organ Donation</h2>
          <form onSubmit={handleSubmit} className="add-organ-form">
            {/* <div className="add-organ-group">
              <label htmlFor="donorId">Donor ID:</label>
              <select
                id="donorId"
                value={inputData.donorId.userId}
                onChange={handleDonorSelectChange}
                className="form-control"
              >
                <option value="">Select a donor</option>
                {donors.map(donor => (
                  <option key={donor.donorId} value={donor.donorId}>
                    {donor.donorId}
                  </option>
                ))}
              </select>
              {errors.donorId && <p className="add-donor-error">{errors.donorId}</p>}
            </div> */}
            <div className="add-organ-group">
                <label htmlFor="donorId">Donor Id : </label>
                <input
                    type="num"
                    id="donorId"
                    name="donorId"
                    value={inputData.donorId.donorId}
                    onChange={handleDonorSelectChange}

                />
            </div>

            <div className="add-organ-group">
              <label htmlFor="organType">Organ Type:</label>
              <select
                id="organType"
                value={inputData.organType}
                onChange={(e) => setInputData({ ...inputData, organType: e.target.value })}
                className="form-control"
              >
                <option value="">Select an organ type</option>
                <option value="Eye">Eye</option>
                <option value="Kidney">Kidney</option>
                <option value="Liver">Liver</option>
                <option value="Heart">Heart</option>
              </select>
              {errors.organType && <p className="add-donor-error">{errors.organType}</p>}
            </div>

            <div className="add-organ-group">
              <label htmlFor="donationDate">Donation Date:</label>
              <input
                id="donationDate"
                type="date"
                value={inputData.donationDate}
                onChange={(e) => setInputData({ ...inputData, donationDate: e.target.value })}
              />
              {errors.donationDate && <p className="add-donor-error">{errors.donationDate}</p>}
            </div>

            <div className="add-organ-group">
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
              {/* <select
  id="recipientId"
  value={inputData.recipientId || ''} // Ensure this is a string or number
  onChange={handleRecipientSelectChange}
  className="form-control"
>
  <option value=" ">Select a recipient</option>
  {recipients.map(recipient => (
    <option key={recipient.recipientId} value={recipient.recipientId}>
      {recipient.recipientId}
    </option>
  ))}
</select> */}

              {errors.recipientId && <p className="add-donor-error">{errors.recipientId}</p>}
            </div>

            <button
              type="submit"
              className="add-organ-submit"
            >
              Donate
            </button>
          </form>
        </div>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
            <Dialog.Content className="fixed top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] bg-white p-6 rounded shadow-lg w-full max-w-lg mx-auto">
            <center><img src="https://www.freeiconspng.com/thumbs/success-icon/success-icon-10.png" alt="Success Logo" className="success-logo" /></center><br />
              <Dialog.Title className="text-lg font-semibold text-gray-800">
                Organ Donation Registration Successful!
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-gray-600">
                The organ donation is in pending state. Please wait for the approval.
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
};

export default DonateOrgan;
