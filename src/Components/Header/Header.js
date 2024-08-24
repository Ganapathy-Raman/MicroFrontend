import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from 'react-icons/fa';
import { IoMdPerson, IoMdApps, IoMdStats } from 'react-icons/io';
import { RiHeartAddFill } from 'react-icons/ri';
import { FaSignInAlt,FaUserPlus } from "react-icons/fa";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAccept = () => {

    navigate('/');
  };

  return (
    <>
      <header className="bg-gray-900 text-white">
        <nav className="navbar sticky-top">
          <div className="navbar-container container mx-auto flex items-center justify-between p-4">
            <input type="checkbox" id="menu-toggle" className="hidden" />
            <label htmlFor="menu-toggle" className="hamburger-lines cursor-pointer md:hidden">
              <FaBars className="text-2xl" />
            </label>

            <ul className="menu-items hidden md:flex space-x-6 items-center">
              <li>
                <a href="#" className="flex items-center space-x-2">
                  <img
                    src="https://t3.ftcdn.net/jpg/05/14/36/48/360_F_514364850_xLOQX6SOY2qcjAIcTowsi3xYvHmhmvs0.jpg"
                    width={46}
                    height={50}
                    alt="fitness logo"
                    className="rounded-full"
                  />
                </a>
              </li>
              <li>
                <Link to="/viewDonor" className="flex items-center space-x-2 hover:text-blue-400">
                  <RiHeartAddFill className="text-xl" />
                  <span>Donor</span>
                </Link>
              </li>
              <li>
                <Link to="/viewApplication" className="flex items-center space-x-2 hover:text-blue-400">
                  <IoMdApps className="text-xl" />
                  <span>Applications</span>
                </Link>
              </li>
              <li>
                <Link to="/viewRecipient" className="hover:text-blue-400"><FaUserPlus />Recipients</Link>
              </li>
              <li>
                <Link to="/viewDonateOrgan" className="flex items-center space-x-2 hover:text-blue-400">
                  <RiHeartAddFill className="text-xl" />
                  <span>Organ Donation</span>
                </Link>
              </li>
              <li>
                <Link to="/viewMedicalRecord" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                  <IoMdStats className="text-xl" />
                  <span>Record</span>
                </Link>
              </li>
              <li>
                <Link to="/adminProfile" className="flex items-center space-x-2 hover:text-blue-400">
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
            <h1 className="logo text-2xl font-bold md:hidden">Admin</h1>
          </div>
        </nav>
      </header>
      {isModalOpen && (
        <div id="popup-modal" className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
          <div className="relative p-6 w-full max-w-md bg-white rounded-lg shadow-lg">
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900"
              onClick={closeModal}
            >
              <FaTimes className="text-2xl" />
            </button>
            <div className="text-center p-4">
              <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Are you sure you want to logout?</h3>
              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-700 rounded-lg px-4 py-2"
                  onClick={handleAccept}
                >
                  Yes, I'm sure
                </button>
                <button
                  type="button"
                  className="text-gray-900 bg-white border border-gray-300 rounded-lg px-4 py-2"
                  onClick={closeModal}
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
