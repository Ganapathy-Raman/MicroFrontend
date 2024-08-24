// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Swal from 'sweetalert2';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFilePdf, faFileImage, faFileAlt } from '@fortawesome/free-solid-svg-icons';
// import Header from "../Header/Header";

// function EditRecipient() {
//   const { recipientId } = useParams();
//   const [data, setData] = useState({
//     recipientId: '',
//     userId: {
//       userId: '',
//       userName: '',
//       email: '',
//       dateOfBirth: '',
//       gender: '',
//       password: ''
//     },
//     recipientName: '',
//     dateOfAvailabity: '',
//     organNeeded: '',
//     address: '',
//     contactNo: '',
//     medicalCondition: '',
//     status: ''
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
    
//     const sessionUserId = sessionStorage.getItem("id");
//     const sessionRecipientName = sessionStorage.getItem("username");

//     if (sessionUserId) {
//       setData(prevState => ({
//         ...prevState,
//         userId: { userId: sessionUserId } 
//       }));
//       fetchUserData(sessionUserId);
//     }

//     if (sessionRecipientName) {
//       setData(prevState => ({
//         ...prevState,
//         recipientName: sessionRecipientName
//       }));
//     }
//   }, []);

//   const fetchUserData = async (id) => {
//     try {
//       const response = await axios.get(`http://localhost:7878/api/${id}`);
//       console.log('User data fetched:', response.data);
//       setData(prevState => ({
//         ...prevState,
//         userId: response.data
//       }));
//     } catch (err) {
//       console.error("Error fetching user data:", err);
//     }
//   };


//   useEffect(() => {
//     axios
//       .get(`http://localhost:7878/recipient/${recipientId}`)
//       .then((response) => {
//         console.log(JSON.stringify(response.data, null, 2)); 
//         setData(response.data);
//       })
//       .catch((err) => console.log(err));
//   }, [recipientId]);

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     if (id.startsWith('userId')) {
//       setData(prevData => ({
//         ...prevData,
//         userId: {
//           ...prevData.userId,
//           [id]: value
//         }
//       }));
//     } else {
//       setData(prevData => ({
//         ...prevData,
//         [id]: value
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .put("http://localhost:7878/recipient", data)
//       .then((res) => {
//         alert("Recipient Updated Successfully");
//         navigate("/viewRecipient");
//       })
//       .catch((err) => console.log(err));
//   };

//   const viewMd = (medicalCondition) =>{
//     if(medicalCondition){
//       Swal.fire({
//         title: 'Medical Condition',
//         imageUrl:`data:image/jpg;base64,${medicalCondition}`,
//         imageWidth: 400,
//         imageHeight: 300,
//         imageAlt:"Id"
//       });
//     }
//   };
//   const getFileIcon = (fileType) => {
    
//     const defaultIcon = faFileAlt;
 
//     if (fileType && fileType.includes('image')) {
//       return faFileImage;
//     } else if (fileType && fileType.includes('pdf')) {
//       return faFilePdf;
//     } else {
//       return defaultIcon;
//     }
//   };

//   return (
//     <><Header />
//     <div className="add-recipient-page">
//       <div className="add-recipient-container">
//         <h2 className="add-recipient-title">UPDATE Recipient</h2>
//         <form onSubmit={handleSubmit} className="add-recipient-form">
//           <div className="add-recipient-group">
//             <label htmlFor="recipientId">Recipient Id:</label>
//             <input
//               id="recipientId"
//               type="number"
//               value={data.recipientId}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="add-recipient-group">
//             <label htmlFor="userId">User Id:</label>
//             <input
//               id="userId.userId"
//               type="number"
//               value={data.userId.userId || ''}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="add-recipient-group">
//             <label htmlFor="recipientName">Recipient Name:</label>
//             <input
//               id="recipientName"
//               type="text"
//               value={data.recipientName}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="add-recipient-group">
//             <label htmlFor="contactNo">Contact No:</label>
//             <input
//               id="contactNo"
//               type="contactNo"
//               value={data.contactNo}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="add-recipient-group">
//             <label htmlFor="dateOfAvailabity">Date Of Availability:</label>
//             <input
//               id="dateOfAvailabity"
//               type="date"
//               value={data.dateOfAvailabity}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="add-recipient-group">
//             <label htmlFor="organNeeded">Organ Needed :</label>
//             <input
//               id="organNeeded"
//               type="text"
//               value={data.organNeeded}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="add-recipient-group">
//             <label htmlFor="address">Address:</label>
//             <input
//               id="address"
//               type="text"
//               value={data.address}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="add-recipient-group">
//             <label htmlFor="medicalCondition">Medical Condition :</label>
//             <button onClick={() => viewMd(data.medicalCondition)}>
//                     <FontAwesomeIcon icon={getFileIcon(data.medicalCondition)} size="lg" />
//                   </button>
//           </div>

//           <div className="add-recipient-group">
//             <label htmlFor="status">Status:</label>
//             <input
//               id="status"
//               type="text"
//               value={data.status}
//               onChange={handleChange}
//             />
//           </div>

//           <button
//             type="submit"
//             className="add-recipient-submit"
//           >
//             Update Recipient
//           </button>
//         </form>
//       </div>
//     </div>
//     </>
//   );
// }

// export default EditRecipient;


import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faFileImage, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import Header from "../Header/Header";

function EditRecipient() {
  const { recipientId } = useParams();
  const [data, setData] = useState({
    recipientId: '',
    userId: {
      userId: '',
      userName: '',
      email: '',
      dateOfBirth: '',
      gender: '',
      password: ''
    },
    recipientName: '',
    contactNo: '',
    dateOfAvailabity: '',  
    address: '',
    organNeeded: '',
    medicalCondition: '',    
    status: ''
  });
  

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:7878/recipient/${recipientId}`)
      .then((response) => {
        console.log(JSON.stringify(response.data, null, 2));
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, [recipientId]);

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
    axios.put("http://localhost:7878/recipient", data)
      .then((res) => {
        alert("Recipient Updated Successfully");
        navigate("/viewRecipient");
      })
      .catch((err) => console.log(err));
  };

    const viewMd = (medicalCondition) =>{
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
    <div className="add-recipient-page">
      <div className="add-recipient-container">
        <h2 className="add-recipient-title">UPDATE Recipient</h2>
        <form onSubmit={handleSubmit} className="add-recipient-form">
  <div className="add-recipient-group">
    <label htmlFor="recipientId">Recipient Id:</label>
    <input
      id="recipientId"
      type="number"
      value={data.recipientId}
      onChange={handleChange}
      readOnly
    />
  </div>

  <div className="add-recipient-group">
    <label htmlFor="userId.userId">User Id:</label>
    <input
      id="userId.userId"
      type="number"
      value={data.userId.userId}
      onChange={handleChange}
      readOnly
    />
  </div>

  <div className="add-recipient-group">
    <label htmlFor="recipientName">Recipient Name:</label>
    <input
      id="recipientName"
      type="text"
      value={data.recipientName}
      onChange={handleChange}
      readOnly
    />
  </div>

  <div className="add-recipient-group">
    <label htmlFor="dateOfAvailabity">Date of Availability:</label>
    <input
      id="dateOfAvailabity"
      type="date"
      value={data.dateOfAvailabity}
      onChange={handleChange}
      readOnly
    />
  </div>

  <div className="add-recipient-group">
    <label htmlFor="organNeeded">Organ Needed:</label>
    <input
      id="organNeeded"
      type="text"
      value={data.organNeeded}
      onChange={handleChange}
      readOnly
    />
  </div>

  <div className="add-recipient-group">
    <label htmlFor="address">Address:</label>
    <input
      id="address"
      type="text"
      value={data.address}
      onChange={handleChange}
      readOnly
    />
  </div>

  <div className="add-recipient-group">
  <label htmlFor="medicalCondition">Medical Condition :</label>
             <button onClick={() => viewMd(data.medicalCondition)}>
                     <FontAwesomeIcon icon={getFileIcon(data.medicalCondition)} size="lg" />
                 </button>
  </div>

  <div className="add-recipient-group">
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
    className="add-recipient-submit"
  >
    Update Recipient
  </button>
</form>

      </div>
    </div>
    </>
  );
}

export default EditRecipient;
