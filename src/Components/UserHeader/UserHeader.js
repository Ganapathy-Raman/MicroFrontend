import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IoMdNotifications, IoMdPerson } from 'react-icons/io';
import { RiHeartAddFill } from 'react-icons/ri';
import { FaSignInAlt } from "react-icons/fa";
import axios from 'axios';

function UserHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isRecipientModalOpen, setIsRecipientModalOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonorData = async () => {
      try {
        const response = await axios.get('http://localhost:7878/donor/10');
        const donorData = response.data;

        if (donorData.status === 'Approved') {
          setHasNotification(true);
        } else {
          setHasNotification(false);
        }
      } catch (err) {
        console.error('Error fetching donor data:', err);
      }
    };

    fetchDonorData();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleAccepts = () => {
    setIsModalOpen(false);
    sessionStorage.clear();
    navigate('/');
  };

  const openDonationModal = () => setIsDonationModalOpen(true);
  const closeDonationModal = () => setIsDonationModalOpen(false);
  const handleAccept = () => {
    setIsDonationModalOpen(false);
    navigate('/donor');
  };

  const openRecipientModal = () => setIsRecipientModalOpen(true);
  const closeRecipientModal = () => setIsRecipientModalOpen(false);
  const handleAcceptss = () => {
    setIsRecipientModalOpen(false);
    navigate('/recipient');
  };

  return (
    <>
      <header className="bg-gray-800 text-white">
        <nav className="navbar sticky-top">
          <div className="navbar-container container mx-auto flex items-center justify-between p-4">
            <input type="checkbox" id="menu-toggle" className="hidden" />
            <label htmlFor="menu-toggle" className="hamburger-lines cursor-pointer">
              <FaBars className="text-2xl" />
            </label>

            <ul className="menu-items flex space-x-4 items-center">
              <li>
                <Link to="/">
                  <img
                    src="https://t3.ftcdn.net/jpg/05/14/36/48/360_F_514364850_xLOQX6SOY2qcjAIcTowsi3xYvHmhmvs0.jpg"
                    width={46}
                    height={50}
                    alt="fitness logo"
                    className="rounded-full"
                  />
                </Link>
              </li>
              <li>
                <button onClick={openDonationModal} className="flex items-center space-x-2 text-gray-300 hover:text-white relative">
                  <RiHeartAddFill className="text-xl" />
                  <span>Donate Organ</span>
                </button>
              </li>
              <li>
                <button onClick={openRecipientModal} className="flex items-center space-x-2 text-gray-300 hover:text-white relative">
                  <RiHeartAddFill className="text-xl" />
                  <span>Recipient</span>
                </button>
              </li>
              <li>
                <Link to="/notification" className="flex items-center space-x-2 text-gray-300 hover:text-white relative">
                  <IoMdNotifications className="text-xl" />
                  <span>Notifications</span>
                  {hasNotification && <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs px-2 py-1">1</span>}
                </Link>
              </li>
              <li>
                <Link to="/profile" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                  <IoMdPerson className="text-xl" />
                  <span>Profile</span>
                </Link>
              </li>
              <li><FaSignInAlt className="text-red-400 hover:text-red-300"/>
                <button onClick={openModal} className="text-red-400 hover:text-red-300">
                  Logout
                </button>
              </li>
            </ul>
            <ul>
            <li>
                <Link className="logo text-2xl font-bold" to="/userDashboard">User Dashboard</Link>
              </li>
              </ul>
          </div>
        </nav>

        {isDonationModalOpen && (
          <div id="static-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="relative p-6 w-full max-w-md bg-white rounded-lg shadow-lg">
              <div className="flex items-center justify-between border-b pb-4 mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Donor Terms and Condition</h3>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-900"
                  onClick={closeDonationModal}
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
              <p className="text-base text-gray-600 mb-4">
                If you would like to donate an organ, please follow the steps outlined below. Your contribution can make a significant difference in someone's life.
              </p>
              <div className="flex justify-between">
                <button onClick={handleAccept} className="text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2">
                  I Accept
                </button>
                <button onClick={closeDonationModal} className="text-gray-600 border border-gray-300 rounded-lg px-4 py-2">
                  Decline
                </button>
              </div>
            </div>
          </div>
        )}

        {isRecipientModalOpen && (
          <div id="static-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="relative p-6 w-full max-w-md bg-white rounded-lg shadow-lg">
              <div className="flex items-center justify-between border-b pb-4 mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Recipient Terms and Condition</h3>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-900"
                  onClick={closeRecipientModal}
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
              <p className="text-base text-gray-600 mb-4">
                If you would like to recieve an organ, please follow the steps outlined below. Your contribution can make a significant difference in someone's life.
              </p>
              <div className="flex justify-between">
                <button onClick={handleAcceptss} className="text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2">
                  I Accept
                </button>
                <button onClick={closeRecipientModal} className="text-gray-600 border border-gray-300 rounded-lg px-4 py-2">
                  Decline
                </button>
              </div>
            </div>
          </div>
        )}

        {isModalOpen && (
          <div id="popup-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="relative p-6 w-full max-w-md bg-white rounded-lg shadow-lg">
              <button
                type="button"
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-900"
                onClick={closeModal}
              >
                <FaTimes className="text-xl" />
              </button>
              <div className="text-center">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Are you sure you want to logout?</h3>
                <button
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-700 rounded-lg px-4 py-2"
                  onClick={handleAccepts}
                >
                  Yes, I'm sure
                </button>
                <button
                  type="button"
                  className="text-gray-600 border border-gray-300 rounded-lg px-4 py-2 mt-3"
                  onClick={closeModal}
                >
                  No, Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default UserHeader;
