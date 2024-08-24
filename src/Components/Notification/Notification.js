import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import "./Notification.css";
import UserHeader from '../UserHeader/UserHeader';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFilePdf, faFileImage, faFileAlt } from '@fortawesome/free-solid-svg-icons';

function Notification() {
    const [donor, setDonor] = useState(null);
    const [recipient, setRecipient] = useState(null);
    const [previousDonor, setPreviousDonor] = useState(null);
    const [previousRecipient, setPreviousRecipient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDonor = async () => {
            try {
                const response = await axios.get('http://localhost:7878/donor/16');
                const fetchedDonor = response.data;

                if (previousDonor && JSON.stringify(fetchedDonor) !== JSON.stringify(previousDonor)) {
                    toast.success('Your organ has been approved!');
                }

                setPreviousDonor(donor); 
                setDonor(fetchedDonor);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching donor data:', err);
                setError('Error fetching donor data');
                setLoading(false);
            }
        };

        fetchDonor();
    }, [donor, previousDonor]);

    // useEffect(() => {
    //     const userId =sessionStorage.getItem("id");
    //     const fetchDonor = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:7878/donor/user/${userId}`);
    //             const fetchedDonor = response.data;

    //                         if (previousDonor && JSON.stringify(fetchedDonor) !== JSON.stringify(previousDonor)) {
    //                             toast.success('Your organ has been approved!');
    //                         }
            
    //                         setPreviousDonor(donor); 
    //                         setDonor(fetchedDonor);
    //                         setLoading(false);
    //                     } catch (err) {
    //                         console.error('Error fetching donor data:', err);
    //                         setError('Error fetching donor data');
    //                         setLoading(false);
    //                     }
    //                 };
            
    //                 fetchDonor();
    //             }, [donor, previousDonor]);
    

    useEffect(() => {
      const fetchRecipient = async () => {
          try {
              const responses = await axios.get('http://localhost:7878/recipient/13');
              const fetchedRecipient = responses.data;

              if (previousRecipient && JSON.stringify(fetchedRecipient) !== JSON.stringify(previousRecipient)) {
                  toast.success('Your request to donate has been approved!');
              }

              setPreviousRecipient(recipient); 
              setRecipient(fetchedRecipient);
              setLoading(false);
          } catch (err) {
              console.error('Error fetching recipient data:', err);
              setError('Error fetching recipient data');
              setLoading(false);
          }
      };

      fetchRecipient();
  }, [recipient, previousRecipient]);

    const handleGoBack = () => {
        navigate('/userDashboard');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

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

    const viewMds = (medicalCondition) =>{
        if(medicalCondition){
          Swal.fire({
            title: 'Medical Condition',
            imageUrl:`data:image/jpg;base64,${medicalCondition}`,
            imageWidth: 400,
            imageHeight: 300,
            imageAlt:"Id"
          });
        }
    };

    const getFileIcons = (fileType) => {
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
        <>
        <UserHeader />
        <div className="notification-card">
            {donor ? (
                <div className="card">
                    <div className="card-body">
                        <b><h2 className="card-title">{donor.donorName} {donor.status === 'Approved' && <span className="badge">Approved</span>}</h2></b>
                        <p>Donor Id : {donor.donorId}</p>
                        <p>User Id : {donor.userId.userId}</p>
                        <p>Address : {donor.address}</p>
                        <p>Contact No : {donor.contactNo}</p>
                        <p>Date of Availabity : {donor.dateOfAvailabity}</p>
                        <p>Donate : {donor.donate}</p>
                        <p>Status : {donor.status}</p>
                        <p>Medical History : <button onClick={() => viewMd(donor.medicalHistory)}>
                            <FontAwesomeIcon icon={getFileIcon(donor.medicalHistory)} size="lg" />
                        </button></p>
                        <button onClick={handleGoBack} className="go-back-button">Go Back</button>
                    </div>
                </div>
            ) : (
                <p>No donor data available</p>
            )}
            {recipient ? (
                <div className="card">
                    <div className="card-body">
                        <b><h2 className="card-title">{recipient.recipientName} {recipient.status === 'Approved' && <span className="badge">Approved</span>}</h2></b>
                        <p>Recipient Id : {recipient.recipientId}</p>
                        <p>User Id : {recipient.userId.userId}</p>
                        <p>Address : {recipient.address}</p>
                        <p>Contact No : {recipient.contactNo}</p>
                        <p>Date of Availabity : {recipient.dateOfAvailabity}</p>
                        <p>Donate : {recipient.organNeeded}</p>
                        <p>Status : {recipient.status}</p>
                        <p>Medical Condition : <button onClick={() => viewMds(recipient.medicalCondition)}>
                            <FontAwesomeIcon icon={getFileIcons(recipient.medicalCondition)} size="lg" />
                        </button></p>
                        <button onClick={handleGoBack} className="go-back-button">Go Back</button>
                    </div>
                </div>
            ) : (
                <p>No recipient data available</p>
            )}
            <ToastContainer />
        </div>
        </>
    );
}

export default Notification;
