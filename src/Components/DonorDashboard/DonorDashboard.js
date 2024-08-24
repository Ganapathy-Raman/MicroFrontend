import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode.react'; 
import './DonorDashboard.css'; 
import UserHeader from '../UserHeader/UserHeader';

function DonorDashboard() {
  const location = useLocation();
  const donorData = location.state?.donorData || {};
  const navigate = useNavigate();
  const generatePDF = () => {
    const input = document.getElementById('donor-details');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210; 
        const pageHeight = 295; 
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('donor-details.pdf');
      })
      .catch((err) => {
        console.error('Error generating PDF:', err);
      });
  };
  const generateRandomString = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  const handleGoBack = () => {
    navigate('/donateOrgan'); 
  };

  return (
    <>
    <UserHeader />
    <div className="dashboard">
      <div className="success-banner">
        <img src="https://www.freeiconspng.com/thumbs/success-icon/success-icon-10.png" alt="Success Logo" className="success-logo" />
        <p className="success-message">Donor registration was successful!</p>
      </div>
      <div className="dashboard-card" id="donor-details">
        {donorData ? (
          <div>
            <b><h1>Donor Dashboard</h1></b>
            <br />
            <br />
            <h1>Thank you for registering as donor! We will update you shortly!!!</h1>
            <br />
            <br />
            <center><b><h2>Donor Details</h2></b></center>
            <br />
            <br />
            <p><strong>User ID:</strong> {donorData.userId.userId}</p>
            <br />
            <br />
            <p><strong>Donor Name:</strong> {donorData.donorName}</p>
            <br />
            <br />
            <p><strong>Date of Availability:</strong> {donorData.dateOfAvailabity}</p>
            <br />
            <br />
            <p><strong>Donate:</strong> {donorData.donate}</p>
            <br />
            <br />
            <p><strong>Address:</strong> {donorData.address}</p>
            <br />
            <br />
            <p><strong>Contact No:</strong> {donorData.contactNo}</p>
            <br />
            <br />
            <p><strong>Status:</strong> {donorData.status}</p>
            <br />
            <br />

            <QRCode
              value={generateRandomString()} 
              size={128} 
              bgColor="#FFFFFF" 
              fgColor="#000000" 
              level="L" 
              includeMargin={true} 
            />
            <br />
            <button onClick={generatePDF} className="download-pdf-button">Download PDF</button>
            <br />
            <button onClick={handleGoBack} className="download-pdf-button">Add Organ Details</button>
          </div>
        ) : (
          <p>No donor data available.</p>
        )}
      </div>
    </div>
    </>
  );
}

export default DonorDashboard;
