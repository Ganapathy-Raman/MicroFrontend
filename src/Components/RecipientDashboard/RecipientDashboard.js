import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode.react'; 
import './RecipientDashboard.css'; 
import UserHeader from '../UserHeader/UserHeader';

function RecipientDashboard() {
  const location = useLocation();
  const recipientData = location.state?.recipientData || {};
  const navigate = useNavigate();
  const generatePDF = () => {
    const input = document.getElementById('recipient-details');
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

        pdf.save('recipient-details.pdf');
      })
      .catch((err) => {
        console.error('Error generating PDF:', err);
      });
  };

  const generateRandomString = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  const handleGoBack = () => {
    navigate('/application'); 
  };

  return (
    <>
    <UserHeader />
    <div className="recipient-dashboard">
      <div className="success-banner">
        <img src="https://www.freeiconspng.com/thumbs/success-icon/success-icon-10.png" alt="Success Logo" className="success-logo" />
        <p className="success-message">Recipient registration was successful!</p>
      </div>
      <div className="recipient-dashboard-card" id="recipient-details">
        {recipientData ? (
          <div>
            <b><h1>Recipient Dashboard</h1></b>
            <br />
            <br />
            <h1>Thank you for registering as recipient! We will update you shortly!!!</h1>
            <br />
            <br />
            <center><b><h2>recipient Details</h2></b></center>
            <br />
            <br />
            <p><strong>User ID:</strong> {recipientData.userId.userId}</p>
            <br />
            <br />
            <p><strong>recipient Name:</strong> {recipientData.recipientName}</p>
            <br />
            <br />
            <p><strong>Date of Availability:</strong> {recipientData.dateOfAvailabity}</p>
            <br />
            <br />
            <p><strong>Organ Needed:</strong> {recipientData.organNeeded}</p>
            <br />
            <br />
            <p><strong>Address:</strong> {recipientData.address}</p>
            <br />
            <br />
            <p><strong>Contact No:</strong> {recipientData.contactNo}</p>
            <br />
            <br />
            <p><strong>Status:</strong> {recipientData.status}</p>
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
            <button onClick={generatePDF} className="download-pdf-r-button">Download PDF</button>
            <br />
            <button onClick={handleGoBack} className="download-pdf-r-button">Add application Details</button>
          </div>
        ) : (
          <p>No recipient data available.</p>
        )}
      </div>
    </div>
    </>
  );
}

export default RecipientDashboard;
