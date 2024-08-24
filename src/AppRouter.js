import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./Components/Nav/Nav.css";
import "./Components/Footer/Footer.css";
import Home from './Components/Home/Home.js';
import AboutUs from './Components/AboutUs/AboutUs.js'
import ContactUs from './Components/ContactUs/ContactUs.js';
import Login from './Components/Login/Login.js';
import Register from './Components/Register/Register.js';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard.js'
import UserDashboard from './Components/UserDashboard/UserDashboard.js';
import MedicalRecord from './Components/MedicalRecord/MedicalRecord.js';
import ViewMedicalRecord from './Components/MedicalRecord/ViewMedicalRecord.js';
import EditMedicalRecord from './Components/MedicalRecord/EditMedicalRecord.js';
import Donor from './Components/Donor/Donor.js';
import ViewDonor from './Components/Donor/ViewDonor.js';
import EditDonor from './Components/Donor/EditDonor.js';
import DonateOrgan from './Components/DonateOrgan/DonateOrgan.js';
import ViewDonateOrgan from './Components/DonateOrgan/ViewDonateOrgan.js';
import EditDonateOrgan from './Components/DonateOrgan/EditDonateOrgan.js';
import EditRecipient from './Components/Recipient/EditRecipient.js';
import ViewRecipient from './Components/Recipient/ViewRecipient.js';
import Application from './Components/Application/Application.js';
import EditApplication from './Components/Application/EditApplication.js';
import ViewApplication from './Components/Application/ViewApplication.js';
import Stats from './Components/Stats/Stats.js';
import UserProfile from './Components/UserProfile/UserProfile.js';
import AdminProfile from './Components/AdminProfile/AdminProfile.js';
import DonorDashboard from './Components/DonorDashboard/DonorDashboard.js';
import Error from './Components/Error/Error.js';
import Notification from './Components/Notification/Notification.js';
import Recipient from './Components/Recipient/Recipient.js';
import RecipientDashboard from './Components/RecipientDashboard/RecipientDashboard.js';
function AppRouter() {
  return (
    <Router class="head">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/stats" element={<Stats />} />
        <Route path='/login' element={<Login />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path='/register' element={<Register />} />
         <Route path="/adminDashboard" element={<AdminDashboard />} />
         <Route path="/userDashboard" element={<UserDashboard />} />
         <Route path="/profile" element={<UserProfile />} />
         <Route path="/adminProfile" element={<AdminProfile />} />
         <Route path="/medicalRecord" element={<MedicalRecord />} />
         <Route path="/viewmedicalRecord" element={<ViewMedicalRecord />} />
         <Route path="/editmedicalRecord/:recordId" element={<EditMedicalRecord />} />
         <Route path="/donor" element={<Donor />} />
         <Route path="/donorDashboard" element={<DonorDashboard />} />
         <Route path="/viewDonor" element={<ViewDonor />} />
         <Route path="/editDonor/:donorId" element={<EditDonor />} />
         <Route path="/donateOrgan" element={<DonateOrgan />} />
         <Route path="/viewdonateOrgan" element={<ViewDonateOrgan />} />
         <Route path="/editDonateOrgan/:donationId" element={<EditDonateOrgan />} />
         <Route path="/recipient" element={<Recipient />} />
         <Route path="/viewRecipient" element={<ViewRecipient />} />
         <Route path="/editRecipient/:recipientId" element={<EditRecipient />} />
         <Route path="/application" element={<Application />} />
         <Route path="/viewApplication" element={<ViewApplication />} />
         <Route path="/editApplication/:applicationId" element={<EditApplication />} />
         <Route path="/*" element={<Error />} />
         <Route path="/notification" element={<Notification />} />
         <Route path="/recipientDashboard" element={<RecipientDashboard />} />
      </Routes>

    </Router>
  )
}

export default AppRouter;


